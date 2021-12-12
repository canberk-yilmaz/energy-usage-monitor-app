const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'User name is required'],
    minLength: 8,
    unique: [true, 'username already exists in database!'],
    // validate: {
    //   validator: function (v) {
    //     return /\d/.test(v)
    //   },
    //   message: '{VALUE} should not contain any numbers.',
    // },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'email already exists in database!'],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'editor', 'user'],
      message: '{VALUE} is not supported',
    },
    default: 'user',
  },
})

module.exports = mongoose.model('User', userSchema)
