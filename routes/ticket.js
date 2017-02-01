var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var TicketController = require('../controllers/ticket_controller')



router.get('/', TicketController.getAllTickets)
router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        //get decoded back, difference between verify and decode, below
        if (err){
            return res.status(401).json({
                title: 'not authenticated',
                error: err
            })
        }
        next()
    })
})
router.post('/', TicketController.newTicket);

router.patch('/:id', TicketController.editTicket)
router.delete('/id', TicketController.deleteTicket)




module.exports = router;
