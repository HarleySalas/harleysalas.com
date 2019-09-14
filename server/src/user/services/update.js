'use strict'

const User = require('../user.model');
const middleware = require('./middleware');
const { catchAsync, AppError } = require('../../../utils');

const password = async (req, next) => {
  const uid = req.currentUser.id;
  if (!req.body.newPassword) {
    throw next(new AppError('You must provide a new password', 400));
  }
  const newPasswordText = req.body.newPassword;
  const newPassword = await middleware.createPassword(newPasswordText);

  await User.findOneAndUpdate({ _id: uid },
    {
      $set: {
        salt: newPassword.salt,
        password: newPassword.hash
      }
    },
    {
      new: true
    }
  )

  return next();
}

module.exports = {
  password
}