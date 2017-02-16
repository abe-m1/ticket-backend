var mongoose = require('mongoose');
const userModel = require('./userModel.js')
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
const userMethods = require('./userMethods.js')

userSchema = new mongoose.Schema(userModel)

userSchema.plugin(mongooseUniqueValidator);

userMethods(userSchema)

module.exports = mongoose.model('User', userSchema);



