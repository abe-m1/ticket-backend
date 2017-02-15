const mongoose = require('mongoose')
const userModel = require('./userModel.js')
const userMethods = require('./userMethods.js')
const userStatics = require('./userStatics.js')

userSchema = new mongoose.Schema(userModel)

userMethods(userSchema)
userStatics(userSchema)

const User = mongoose.model('User', userSchema)

module.exports = User