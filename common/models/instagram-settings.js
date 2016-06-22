module.exports = function(InstagramSettings) {

  /**
   * Update the property updatedAt every time the model is saved
   */
  InstagramSettings.beforeRemote('prototype.updateAttributes', function(ctx, client, next) {
    var body = ctx.req.body;
    body.updated = new Date();
    next();
  });

};
