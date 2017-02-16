const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const Ticket = {
    title : String ,
    category: String,
    description: String,
    dateCreated: String,
    dateLastModified: String,
    status: String,
    assignedTo: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    imageUrl: String
}

module.exports = Ticket