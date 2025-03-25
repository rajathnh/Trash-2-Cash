const jwt = require('jsonwebtoken');

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = {
  isTokenValid,
};
