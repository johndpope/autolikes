module.exports = function(Client) {

  /**
   * Disable methods that are not necessary.
   */
  Client.disableRemoteMethod('createChangeStream', true);

  /**
   * Update the property updatedAt every time the model is saved
   */
  Client.beforeRemote('prototype.updateAttributes', function(ctx, client, next) {
    var body = ctx.req.body;
    body.updatedAt = new Date();
    next();
  });

};
