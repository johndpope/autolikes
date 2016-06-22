const ig = require('../../server/instagram');

module.exports = function(InstagramAccount) {

  /**
   * Disable methods that are not necessary.
   */
  InstagramAccount.disableRemoteMethod('create', true);
  InstagramAccount.disableRemoteMethod('createChangeStream', true);

  /**
   * Update the property updatedAt every time the model is saved
   */
  InstagramAccount.beforeRemote('prototype.updateAttributes', function(ctx, client, next) {
    var body = ctx.req.body;
    body.updatedAt = new Date();
    next();
  });

  /**
   * Validate the counts object property
   */
  InstagramAccount.validate('counts', function (err, done, er) {
    if (!this.counts) { return err() }
    if (!this.counts.media) { return err() }
    if (!this.counts.followedBy) { return err() }
    if (!this.counts.follows) { return err() }
    if (!this.counts.followedByStart) { this.counts.followedByStart = this.counts.followedBy }
  }, { message: 'Counts format invalid' });

  // InstagramAccount.validatesPresenceOf('organizationId');
  // InstagramAccount.validatesPresenceOf('instagramSettingsId');

  /**
   * InstagramAccount.Sync()
   * Create or update an InstagramAccount model using the Instagram API Auth.
   * https://github.com/totemstech/instagram-node
   */

  var redirect_uri = 'http://localhost:3000/';

  /**
   * Get the code to exchange for an access_token in this URL:
   * https://www.instagram.com/oauth/authorize/?client_id=6e83065781374927a7dafe23d05a9fb1&redirect_uri=http://localhost:3000/&response_type=code
   */

  InstagramAccount.sync = function(credentials, cb) {
    var body = {};
    var code = credentials.code;

    /**
     * Authorize user using exchange code.
     */
    ig.authorize_user(code, redirect_uri, function(err, result) {
      if (err) {
        cb(null, err.body);
      } else {
        var accessToken = result.access_token;

        // The Instagram lib now is using the selected accessToken.
        ig.use({ access_token: accessToken });

        // Find the current user and create or update a model.
        ig.user(result.user.id, function(err, result, remaining, limit) {
          if (err) {
            cb(null, err.body);
          } else {
            InstagramAccount.upsert({
              accessToken: accessToken,
              id: result.id,
              username: result.username,
              bio: result.bio,
              website: result.website,
              profilePicture: result.profile_picture,
              fullName: result.full_name,
              counts: {
                media: result.counts.media,
                followedBy: result.counts.followed_by,
                follows: result.counts.follows,
              }
            })
              .then((response) => cb(null, response))
              .catch((err) => cb(null, err))
          }
        });
      }
    });
  }

  /**
   * Declare Sync remote method interface
   */
  InstagramAccount.remoteMethod('sync', {
    description: 'Get Instagram access token using auth code',
    accepts: {
      arg: 'credentials',
      type: 'object',
      required: true,
      http: { source: 'body' },
      description: 'Get a valid code from the oauth url'
    },
    returns: { arg: 'instagramAccount', type: 'object', root: true },
    http: { verb: 'post' }
  });

};
