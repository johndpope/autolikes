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

};
