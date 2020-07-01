import mongoose from "mongoose";
require('../model/anno_model')
const Anno = mongoose.model('Announcement')

class anno {



    //display announcement page with data
   getAnno(req, res){
       
    Anno.find((err, docs) => {
     if (!err) {
         res.render("admin/anno", {
             list2: docs,
             viewTitle1: 'Add Announcement',
             viewTitle2: 'Announcement List'
         });
     }
     else {
         console.log('Error in retrieving Anno list :' + err);
     }
 }).lean();
    
}

//post announcement 
postAnno(req, res){

 if (req.body._id == '')
 insertRecordAnno(req, res); // insert data function
 else
 updateRecordAnno(req, res); // update data function

}

//find id of anouncement
idAnno(req, res){
 Anno.findById(req.params.id, (err, doc) => {
    
         res.render("admin/anno", {
             viewTitle1: "Update Announcement",
             viewTitle2: 'Announcement List',
             anno: doc,
             
         });
     
 }).lean();
}

//delete announcement 
deleteAnno(req, res){
 Anno.findByIdAndRemove(req.params.id, (err, doc) => {
     if (!err) {
         res.redirect('/anno');
     }
     else { console.log('Error in Anno delete :' + err); }
 }).lean();
}



}


//insert announcement function
function insertRecordAnno(req, res){
    var anno = new Anno()
    anno.title = req.body.title
    anno.note = req.body.note
    anno.save((err, doc)=>{
     if (!err)
     res.redirect('/anno');

     else {
        if (err.name == 'ValidationError') {
            handleValidationErrorAnno(err, req.body);
            res.render("admin/anno", {
                viewTitle1: "Insert Announcement",
                anno: req.body
            });
        }
        else
            console.log('Error during anno record insertion : ' + err);
    }
    })
}


//update announcement function
 function updateRecordAnno(req, res) {

    Anno.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/anno'); }
       
            else{
                console.log('Error during timetable update : ' + err);
            }
    });

 }

//validation for announcement
function handleValidationErrorAnno(err, body) {
    for (var field in err.errors) {
        switch (err.errors[field].path) {
            case 'title':
                body['titleError'] = err.errors[field].message;
                break;
            case 'note':
                body['noteError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}


module.exports = anno