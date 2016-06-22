module.exports = function(Organization) {

  Organization.beforeRemote('prototype.updateAttributes', function(ctx, client, next) {
    var body = ctx.req.body;
    body.updatedAt = new Date();
    next();
  });

};
