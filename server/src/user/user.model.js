'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    maxLength: 72
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: 5,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100
  },
  salt: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 72
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  active: {
    type: Boolean,
    default: false
  },
  activation: {
    type: String,
    default: ''
  },
  recovery: {
    type: String,
    default: ''
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

//Model Creation using user Schema

module.exports = mongoose.model('User', userSchema);