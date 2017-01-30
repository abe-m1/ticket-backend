var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    tickets: [{type: Schema.Types.ObjectId, ref: 'Ticket'}],
    reset_password_token: String,
    reset_password_set_at: String
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);