
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');



exports.auth = (req, res, callback ) => {

  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return err;

    callback(decoded.id);
  });
};
