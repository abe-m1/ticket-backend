 var express = require('express');
 var router = express.Router();
 var jwt = require('jsonwebtoken')
 var ticketController = require('../controllers/ticket_controller')



// router.get('/', TicketController.getAllTickets)
// router.use('/', function(req, res, next){
//     jwt.verify(req.headers.token, 'secret', function(err, decoded){
//         //get decoded back, difference between verify and decode, below
//         if (err){
//             return res.status(401).json({
//                 title: 'not authenticated',
//                 error: err
//             })
//         }
//         next()
//     })
// })
// router.post('/', TicketController.newTicket);
// router.patch('/:id', TicketController.editTicket)
// router.delete('/id', TicketController.deleteTicket)




// module.exports = router;




function init(Router) {
    
    Router.get('/ticket', ticketController.getAllTickets)
     
    Router.post('/ticket', ticketController.newTicket)
    Router.route('/ticket/:id')
        
        .patch(ticketController.editTicket)
        .delete(ticketController.deleteTicket)

    
   
}

module.exports.init = init