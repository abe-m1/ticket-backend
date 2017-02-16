const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const ticketModel = require('./ticketModel.js')
const ticketMethods = require('./ticketMethods.js')

ticketSchema = new mongoose.Schema(ticketModel)

ticketMethods(ticketSchema)

const ModelClass = mongoose.model('ticket', ticketSchema)
module.exports = ModelClass