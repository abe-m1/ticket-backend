const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const ticketModel = require('./ticketModel.js')


ticketSchema = new mongoose.Schema(ticketModel)



const ModelClass = mongoose.model('ticket', ticketSchema)
module.exports = ModelClass