'use strict'

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../user.model');

const signToken = data => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = async (user, statusCode, req, res) => {
  const data = { id: user._id, username: user.username, role: user.role };
  const token = await signToken(data);

  res.cookie('jwt', token, {
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + process.env.JWT_COOKIE_EXPIRES_IN)),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  })

  res.status(statusCode).json({
    status: 'success',
    data
  });
}

module.exports = createSendToken;