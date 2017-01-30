const mongoose  = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    title : String ,
    categories: String,
    content: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    imageUrl: String
})



const ModelClass = mongoose.model('ticket', ticketSchema)
module.exports = ModelClass