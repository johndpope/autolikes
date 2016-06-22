// module.exports = function(app) {
//   var Client = app.models.Client;
//   var Role = app.models.Role;
//   var RoleMapping = app.models.RoleMapping;


//   Client.create([
//     { email: 'contact@juanpujol.com', password: 'lasanha123', name: 'Juan Pujol' },
//     { email: 'riconegri@gmail.com', password: 'lasanha123', name: 'Ricardo Negri' }
//   ], function(err, client) {
//     if (err) throw err;

//     //create the admin role
//     Role.findOrCreate({
//       name: 'client',
//       description: 'Has access to authorized organizations'
//     }, function(err, role) {
//       if (err) throw err;

//       //make bob an admin
//       role.principals.create({
//         principalType: RoleMapping.USER,
//         principalId: client[0].id
//       }, function(err, principal) {
//         if (err) throw err;
//       });
//     });
//   });
// }
