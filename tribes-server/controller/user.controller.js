require('dotenv').config();
const userService = require('../services/user.service');
const kingdomService = require('../services/kingdom.service');
const jwt = require('jsonwebtoken');


const userRegister = (req, res) => {
  const { username, password, kingdom } = req.body;
  let kingdomName = '';
  if (!kingdom) {
    kingdomName = `${username}'s kingdom`;
  } else {
    kingdomName = `${kingdom}'s kingdom`;
  }
  if (!username || !password) {
    if (!username && !password) {
      res.status(400).json({
        status: 'error',
        message: 'Missing parameters: username, password!',
      });
    } else if (!password) {
      res.status(400).json({
        status: 'error',
        message: 'Missing parameter: password!',
      });
    } else if (!username) {
      res.status(400).json({
        status: 'error',
        message: 'Missing parameter: username!',
      });
    }
  } else {
    userService.postUser(username, password)
      .then((users) => {
        if (users) {
          kingdomService.postKingdom(kingdomName, users)
            .then((kingdoms) => {
              userService.attachKingdom(username, kingdoms.id)
                .then((updatedUser) => {
                  res.status(200).json({
                    id: updatedUser.id,
                    username: updatedUser.username,
                    kingdomId: updatedUser.kingdomId,
                  });
                });
            });
        }
      })
      .catch((error) => {
        if (error.code === 11000) {
          res.status(409).json({
            status: 'error',
            error: 'Username already taken, please choose an other one.',
          });
        } else {
          res.status(500).json(error);
        }
      });
  }
};

const userLogin = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    if (!username && !password) {
      res.status(400).json({
        status: 'error',
        message: 'Missing parameters: username, password!',
      });
    } else if (!password) {
      res.status(400).json({
        status: 'error',
        message: 'Missing parameter: password!',
      });
    } else if (!username) {
      res.status(400).json({
        status: 'error',
        message: 'Missing parameter: username!',
      });
    }
  } else {
    userService.getUser(username)
      .then((user) => {
        if (user.validPassword(password)) {
          jwt.sign({ userId: user._id, kingdomId: user.kingdomId }, process.env.SECRET, { expiresIn: '720h' }, (err, token) => {
            if (err) {
              res.json({
                message: 'invalid token',
              });
            } else {
              res.json({
                status: 'ok',
                token,
              });
            }
          });
        } else {
          res.status(400).json({
            status: 'error',
            message: 'Wrong password!',
          });
        }
      })
      .catch(error => res.status(401).json({ status: error, message: `no such user: ${username}` }));
  }
};

module.exports = {
  userRegister,
  userLogin,
};
