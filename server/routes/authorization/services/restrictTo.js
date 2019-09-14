'use strict'

const { AppError } = require('../../../utils');

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      throw next(new AppError('Access restricted', 403))
    } else {
      next();
    }
  }
}

module.exports = restrictTo;