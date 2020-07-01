import mongoose from 'mongoose';
require('../model/ticket')
const Ticket = mongoose.model('Ticket')

class ticket{

    getTicket(req, res){
        Ticket.find((err, docs) => {
            if (!err) {
                res.render("admin/ticket", {
                    list: docs,
                    viewTitle2 : 'ticket status update only',
                    viewTitle3 : 'ticket list'
                });
            }
            else {
                console.log('Error in retrieving ticket data :' + err);
            }
        }).lean();
    }



    postTicket(req, res){
       
       
        Ticket.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
            if (!err) { res.redirect('/ticket'); }
           
                else{
                    res.render('admin/ticket',{
                       
                        viewTitle3: 'ticket list List',
                        viewTitle1: 'Only Update'
                          
                    })
                    console.log('Error during ticket update : ' + err);
                }
        });
       

    
    }

    //find id of anouncement
   idTicket(req, res){
    console.log(req.body)
    Ticket.findById(req.params.id, (err, doc) => {
    
         res.render("admin/ticket", {
             viewTitle1: "Update Ticket",
             viewTitle2: 'ticket list List',
             ticket: doc,
             
         });
   
 }).lean();
 


}


    

}

module.exports = ticket