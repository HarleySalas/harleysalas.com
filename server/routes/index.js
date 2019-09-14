'use strict';

const userRoute = require('./user');

//Initialize Routes
const init = (app) => {
  app.use('/api/v1/user', userRoute);
}

module.exports = {
  init
}