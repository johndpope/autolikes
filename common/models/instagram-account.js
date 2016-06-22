module.exports = function(InstagramAccount) {

  InstagramAccount.disableRemoteMethod('create', true);
  InstagramAccount.disableRemoteMethod('createChangeStream', true);
  InstagramAccount.disableRemoteMethod('__create__instagramsettings', false);
  InstagramAccount.disableRemoteMethod('__destroyById__instagramsettings', false);
  InstagramAccount.disableRemoteMethod('__delete__instagramsettings', false);

  InstagramAccount.beforeRemote('prototype.updateAttributes', function(ctx, client, next) {
    var body = ctx.req.body;
    body.updatedAt = new Date();
    next();
  });

  InstagramAccount.validatesPresenceOf('organizationId');
  InstagramAccount.validatesPresenceOf('instagramSettingsId');

  /**
   * InstagramAccount.Sync()
   * Create or update an InstagramAccount model using the Instagram API Auth.
   */

  InstagramAccount.sync = function(cb) {
    // https://github.com/totemstech/instagram-node
  }

  InstagramAccount.remoteMethod('sync', {
    description: 'Login to an Instagram Account with username and password.',
    accepts: {
      arg: 'credentials',
      type: 'object',
      required: true,
      http: { source: 'body' },
      description: 'Instagram username and password are required.'
    },
    returns: [
      { arg: 'instagramAccount', type: 'object' }
    ],
    http: { verb: 'post' }
  });

};
