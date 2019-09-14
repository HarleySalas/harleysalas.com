'use strict'

//Ensures that user has a valid login and passes the current user to next()

const jwt = require('jsonwebtoken');
const { AppError, catchAsync } = require('../../../utils');

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt
  } else if (!req.cookies.jwt) {
    throw next(new AppError('You are not logged in. Please login.', 401));
  }

  //Decode jwt token. If false verification, triggers 500 error.
  const decoded = await jwt.verify(token, process.env.JWT_SECRET, ((err, decoded) => {
    if (err) {
      throw next(new AppError('Authentication failed. Try logging back in again.', 401));
    } else return decoded;
  }));

  //set req.current user to contain the current user's information.
  req.currentUser = decoded;

  next();
})

module.exports = protect;
