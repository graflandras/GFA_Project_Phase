require('dotenv').config();
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          succes: false,
          message: 'Token is not valid',
        });
      }
      req.user = decoded;
      next();
      return null;
    });
  } else {
    res.status(403).json({
      succes: false,
      message: 'Auth token is not supplied',
    });
  }
};

module.exports = verifyToken;
