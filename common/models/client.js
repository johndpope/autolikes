module.exports = function(Client) {

  Client.beforeRemote('prototype.updateAttributes', function(ctx, client, next) {
    var body = ctx.req.body;
    body.updatedAt = new Date();
    next();
  });

};
