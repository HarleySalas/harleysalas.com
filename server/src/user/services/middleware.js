'use strict'

const User = require('../user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AppError, catchPromise, tryCatch } = require('../../../utils');

const createPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  return new Promise((resolve, reject) => {
    !salt || !hash && reject(new AppError('Internal Error', 500));

    resolve({ salt, hash });
  })
}

const checkPassword = async (username, password, next) => {
  const user = await User.findOne({ username });

  if (!user || user.length <= 0) {
    throw next(new AppError('User not found.', 500));
  }

  const hash = await bcrypt.hash(password, user.salt);

  if (user.password === hash) {
    return user;
  } else {
    throw next(new AppError('Password does not match', 400));
  }
}

const verifyPassword = async (req, next) => {
  const username = req.currentUser.username;
  if (!req.body.password) {
    throw next(new AppError('You must verify your password', 400));
  }
  const user = await User.findOne({ username });
  const hash = await bcrypt.hash(req.body.password, user.salt)

  return new Promise((resolve, reject) => {
    if (user.password !== hash) {
      reject(new AppError('Incorrect password', 400));
    } else if (user.password === hash) {
      resolve();
    }
  })
}

module.exports = {
  createPassword,
  checkPassword,
  verifyPassword
}