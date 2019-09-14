'use strict'

const {
  config,
  db,
  express
} = require('../config');
const routes = require('../../routes');
const mongoose = require('mongoose');
const { errorHandler } = require('../../utils');


let server = null;

const listen = () => {
  const app = express.init();
  db.init();
  routes.init(app)
  app.use(errorHandler);
  server = app.listen(config.port, config.ip);
  console.log(`Listening at http://${config.host}:${config.port}`);
}

const close = () => {
  server.close();
  mongoose.disconnect();
  console.log('Server Closed.');
}

module.exports = {
  listen,
  close
}