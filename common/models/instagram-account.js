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
   * Sync
   * Create a new InstagramAccount model using the Instagram API Auth.
   */

  InstagramAccount.sync = function(cb) {
    // https://github.com/totemstech/instagram-node
  }

  InstagramAccount.remoteMethod('sync', {
    accepts: [
      { arg: 'username', type: 'string', required: true },
      { arg: 'password', type: 'string', required: true }
    ],
    returns: [
      { arg: 'instagramAccount', type: 'object' }
    ]
  });

};
