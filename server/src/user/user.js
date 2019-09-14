'use strict'

const { catchAsync } = require('../../utils');
const { register } = require('./services/registration');
const login = require('./services/login');
const logout = require('./services/logout');
const update = require('./services/update');
const middleware = require('./services/middleware');
const createSendToken = require('./services/authentication');
const action = {};

/*
USER REGISTER ACTION
*/
action.register = catchAsync(async (req, res, next) => {
  const newUser = await register(req, next);

  res.status(201).json({
    status: 'success',
    message: 'User successfully registered'
  });
});

/*
USER LOGIN ACTION
*/
action.login = catchAsync(async (req, res, next) => {
  const user = await login(req, next);

  createSendToken(user, 200, req, res);
});

/*
USER LOGOUT ACTION
*/
action.logout = async (req, res) => {
  logout(res);

  res.status(200).json({
    status: 'success',
    message: 'Successfully logged out.'
  });
};

/*
USER UPDATE PASSWORD ACTION
*/
action.updatePassword = catchAsync(async (req, res, next) => {
  await middleware.verifyPassword(req, next);
  await update.password(req, next);

  res.status(201).json({
    status: 'success',
    message: 'Password successfully updated.'
  })
});

module.exports = action;