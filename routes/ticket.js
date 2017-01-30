var express = require('express');
var router = express.Router();

var TicketController = require('../controllers/ticket_controller')

var User = require('../models/user.model');

router.post('/', TicketController.newTicket);



module.exports = router;
