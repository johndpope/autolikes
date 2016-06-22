// https://github.com/totemstech/instagram-node

const instagram = require('instagram-node').instagram();

instagram.use({
  client_id: '6e83065781374927a7dafe23d05a9fb1',
  client_secret: '944fa2823b89461798336d6c296a12a5'
});

module.exports = instagram;
