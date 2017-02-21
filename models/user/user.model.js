var mongoose = require('mongoose');
const userModel = require('./userModel.js')
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

userSchema = new mongoose.Schema(userModel)

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);



