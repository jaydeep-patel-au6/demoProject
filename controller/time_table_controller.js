import mongoose from 'mongoose';
require('../model/timetable_model')
const TT = mongoose.model('Timetable')




class timetable{

    getTimetable(req, res){
        TT.find((err, docs) => {
            if (!err) {
                res.render("admin/timetable", {
                    list2: docs,
                    viewTitle1: 'Add Timetable',
                    viewTitle2: 'Timetable List'
                });
            }
            else {
                console.log('Error in retrieving timetable list :' + err);
            }
        }).lean();
    }

    postTimetable(req, res){
       
        if (req.body._id == '')
        insertRecordtt(req, res); // insert data function
        else
        updateRecordtt(req, res); // update data function

    }

     //find id of anouncement
   idTimetable(req, res){
       console.log(req.body)
    TT.findById(req.params.id, (err, doc) => {
       
            res.render("admin/timetable", {
                viewTitle1: "Update Timetable",
                viewTitle2: 'timetable List',
                tt: doc,
                
            });
        
    }).lean();
    ;
   }
  
   //delete announcement 
   deleteTimetable(req, res){
    TT.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/timetable');
        }
        else { console.log('Error in timetable delete :' + err); }
    }).lean();
   }

 
}

//insert timetable function
function insertRecordtt(req, res){
   
    var tt = new TT()
    tt.class = req.body.class
    tt.day = req.body.day
    tt.session1 = req.body.session1
    tt.teacher1 = req.body.teacher1
    tt.session2 = req.body.session2
    tt.teacher2 = req.body.teacher2
    tt.save((err, doc)=>{
     if (!err)
     res.redirect('/timetable');

     else {
        if (err.name == 'ValidationError') {
            handleValidationErrortt(err, req.body);
            res.render("admin/timetable", {
                viewTitle1: "Set TimeTable",
                tt: req.body
            });
        }
        else
            console.log('Error during timetable record insertion : ' + err);
    }
    })
}

//update timetable function
function updateRecordtt(req, res) {
    console.log(req.body)
    TT.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/timetable'); }
       
            else{
                console.log('Error during timetable update : ' + err);
            }
    });
}

function handleValidationErrortt(err, body) {
    for (var field in err.errors) {
        switch (err.errors[field].path) {
            case 'class':
                body['classError'] = err.errors[field].message;
                break;
            case 'day':
                body['dayError'] = err.errors[field].message;
                break;
            case 'session1':
                body['session1Error'] = err.errors[field].message;
                break;
            case 'teacher1':
                body['teacher1Error'] = err.errors[field].message;
                break;
            case 'session2':
                body['session2Error'] = err.errors[field].message;
                break;
            case 'teacher2':
                body['teacher2Error'] = err.errors[field].message;
                break;
           
           
           
            default:
                break;
        }
    }
}


module.exports = timetable