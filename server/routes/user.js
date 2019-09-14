'use strict'

const express = require('express');
const router = express.Router();
const user = require('../src/user');
const { protect, restrictTo } = require('./authorization');

router.post('/register', user.register);
router.post('/login', user.login);
router.post('/logout', user.logout);
router.put('/update/password', protect, user.updatePassword);

//PROTECTED ROUTE EXAMPLE
/*
router.post('/example', protect, restrictTo('admin'), user.example);
*/

module.exports = router;