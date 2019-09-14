'use strict'

const config = require('./config')
const mongoose = require('mongoose')

//connect to database
const init = () => {
  mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  const db = mongoose.connection
  error(db)
  open(db)
  close(db);
}

//Database error callback
const error = (db) => {
  db.on('error', (err) => {
    // If first connect fails because mongod is down, try again later.
    // This is only needed for first connect, not for runtime reconnects.
    // See: https://github.com/Automattic/mongoose/issues/5169
    if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
      console.log(new Date(), String(err));

      // Wait for a bit, then try to connect again
      setTimeout(function () {
        console.log("Retrying first connect...");
        db.openUri(config.mongoUrl).catch(() => { });
        // Why the empty catch?
        // Well, errors thrown by db.open() will also be passed to .on('error'),
        // so we can handle them there, no need to log anything in the catch here.
        // But we still need this empty catch to avoid unhandled rejections.
      }, 20 * 1000);
    } else {
      // Some other error occurred.  Log it.
      console.error('DB ERROR', new Date(), String(err));
    }
  });

}

//Database connected callback
const open = (db) => {
  db.once('open', () => {
    console.log('Database connected')
  })
}

const close = (db) => {
  db.on('close', () => {
    db.removeAllListeners();
  })
}

module.exports = {
  init
}
