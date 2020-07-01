import mongoose from "mongoose";
require('../model/final_exam_model')
const FM = mongoose.model('Finalexam')

class final {

    getfinal(req, res){
        FM.find((err, docs) => {
            if (!err) {
                res.render("admin/final", {
                    list2: docs,
                    viewTitle1: 'Add marks',
                    viewTitle2: 'final exam mark List'
                });
            }
            else {
                console.log('Error in retrieving final exam marks list :' + err);
            }
        }).lean();
    }

    postfinal(req, res){
       
        if (req.body._id == '')
        insertRecordf(req, res); // insert data function
        else
        updateRecordf(req, res); // update data function

    }

     //find id of final exam marks
   idfinal(req, res){
    FM.findById(req.params.id, (err, doc) => {
       
            res.render("admin/final", {
                viewTitle1: "Update Marks",
                viewTitle2: 'final mark list List',
                fM: doc,
                
            });
        
    }).lean();
   }
  
   //delete marks 
   deletefinal(req, res){
    FM.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/final');
        }
        else { console.log('Error in final exam mark delete :' + err); }
    }).lean();
   }

 
}

//insert final exam marks function
function insertRecordf(req, res){
   
    var fM = new FM()
    fM.name = req.body.name
    fM.class = req.body.class
    fM.roll_no = req.body.roll_no
    fM.phy = req.body.phy
    fM.chm = req.body.chm
    fM.maths = req.body.maths
    fM.english = req.body.english
    fM.computer = req.body.computer
    fM.save((err, doc)=>{
     if (!err)
     res.redirect('/final');

     else {
        if (err.name == 'ValidationError') {
            handleValidationErrorf(err, req.body);
            res.render("admin/final", {
                viewTitle1: "Set marks",
                fM: req.body
            });
        }
        else
            console.log('Error during final exam marks insertion : ' + err);
    }
    })
}

//update final exam marks function
function updateRecordf(req, res) {
    FM.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/final'); }
       
            else{
                console.log('Error during final exam mark update : ' + err);
            }
    });
}

function handleValidationErrorf(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'class':
                body['classError'] = err.errors[field].message;
                break;
            case 'roll_no':
                body['roll_noError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}


module.exports = final