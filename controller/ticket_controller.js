const mongoose = require('mongoose')
require('../model/ticket')
const Ticket = mongoose.model('Ticket')

class ticket{

    getTicket(req, res){
        Ticket.find((err, docs) => {
            if (!err) {
                res.render("admin/ticket", {
                    list: docs,
                    viewTitle2 : 'ticket list'
                });
            }
            else {
                console.log('Error in retrieving ticket data :' + err);
            }
        }).lean();
    }

}

module.exports = ticket