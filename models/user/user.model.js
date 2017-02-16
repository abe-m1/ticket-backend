var mongoose = require('mongoose');
const userModel = require('./userModel.js')
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
const userMethods = require('./userMethods.js')
const userStatics = require('./userStatics.js')

userSchema = new mongoose.Schema(userModel)

userSchema.plugin(mongooseUniqueValidator);

userMethods(userSchema)
userStatics(userSchema)



module.exports = mongoose.model('User', userSchema);



