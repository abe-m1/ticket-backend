const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const User = {
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    tickets: [{type: Schema.Types.ObjectId, ref: 'Ticket'}],
    reset_password_token: String,
    reset_password_set_at: String
}

module.exports = User



    