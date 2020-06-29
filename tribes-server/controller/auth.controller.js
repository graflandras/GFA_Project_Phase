require('dotenv').config();
const jwt = require('jsonwebtoken');


const authVerifyToken = (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      res.status(403).json({ succes: false, message: 'forbidden verify wrong token' });
    } else {
      res.status(200).json({ succes: true, userId: data.userId, kingdomId: data.kingdomId });
    }
  });
};

module.exports = {
  authVerifyToken,
};
