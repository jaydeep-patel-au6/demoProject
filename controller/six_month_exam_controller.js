import mongoose from "mongoose";
//const mongoose = require('mongoose')
require('../model/six_month_exam_model')
const SixM = mongoose.model('Sixmonthexam')

class sixExamMarks {

    getSixMarks(req, res){
        SixM.find((err, docs) => {
            if (!err) {
                res.render("admin/sixMonth", {
                    list2: docs,
                    viewTitle1: 'Add marks',
                    viewTitle2: 'Six month exam mark List'
                });
            }
            else {
                console.log('Error in retrieving 6 month exam marks list :' + err);
            }
        }).lean();
    }

    postSixMarks(req, res){
       
        if (req.body._id == '')
        insertRecord6(req, res); // insert data function
        else
        updateRecord6(req, res); // update data function

    }

     //find id of anouncement
   idSixMarks(req, res){
    SixM.findById(req.params.id, (err, doc) => {
        
            res.render("admin/sixMonth", {
                viewTitle1: "Update Marks",
                viewTitle2: '6 month mark list List',
                sixM: doc,
                
            });
       
    }).lean();
   }
  
   //delete announcement 
   deleteSixMarks(req, res){
    SixM.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/marksix');
        }
        else { console.log('Error in 6 months mark delete :' + err); }
    }).lean();
   }

 
}

//insert timetable function
function insertRecord6(req, res){
   
    var sixM = new SixM()
    sixM.name = req.body.name
    sixM.class = req.body.class
    sixM.roll_no = req.body.roll_no
    sixM.phy = req.body.phy
    sixM.chm = req.body.chm
    sixM.maths = req.body.maths
    sixM.english = req.body.english
    sixM.computer = req.body.computer
    sixM.save((err, doc)=>{
     if (!err)
     res.redirect('/marksix');

     else {
        if (err.name == 'ValidationError') {
            handleValidationError6(err, req.body);
            res.render("admin/sixMonth", {
                viewTitle1: "Set marks",
                sixM: req.body
            });
        }
        else
            console.log('Error during six Month exam marks insertion : ' + err);
    }
    })
}

//update timetable function
function updateRecord6(req, res) {
    SixM.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/marksix'); }
       
            else{
                console.log('Error during six month exam mark update : ' + err);
            }
    });
}

function handleValidationError6(err, body) {
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


module.exports = sixExamMarks