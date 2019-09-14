'use strict'

const User = require('../user.model');
const crypto = require('crypto');
const middleware = require('./middleware');
const { AppError, catchAsync } = require('../../../utils');

const register = async (req, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw next(new AppError('You must provide a username, email and password', 401));
  }

  const activationHash = crypto.randomBytes(48).toString('hex');
  const setPassword = await middleware.createPassword(password);

  const user = new User({
    username,
    email,
    salt: setPassword.salt,
    password: setPassword.hash,
    activation: activationHash
  })

  return new Promise((resolve, reject) => {
    user.save((err, user) => {
      if (err) {
        return reject(new AppError('User already exists. Please try again.', 401));
      } else {
        resolve(user);
      }
    })
  })
}

module.exports = {
  register
}