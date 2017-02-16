const mongoose  = require('mongoose')
const Schema = mongoose.Schema
const ticketModel = require('./ticketModel.js')
const ticketMethods = require('./ticketMethods.js')
const ticketStatics = require('./ticketStatics.js')

ticketSchema = new mongoose.Schema(ticketModel)

ticketMethods(ticketSchema)
ticketStatics(ticketSchema)

const ModelClass = mongoose.model('ticket', ticketSchema)
module.exports = ModelClass