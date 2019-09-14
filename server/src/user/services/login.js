'use strict'

const middleware = require('./middleware');
const { AppError } = require('../../../utils');

const login = async (req, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw next(new AppError('You must provide a username and password.', 400));
  }

  const user = await middleware.checkPassword(username, password, next);

  return user;
}

module.exports = login;