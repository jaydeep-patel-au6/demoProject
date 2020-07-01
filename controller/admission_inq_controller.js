import mongoose from "mongoose";
require('../model/admission_inq_models')
const AdmissionInq = mongoose.model('Admission_inquiry')


//insert data function for admission inq form
function insertRecord(req, res){

    let admissionInq = new AdmissionInq()
    admissionInq.studentName = req.body.studentName
    admissionInq.parentName = req.body.parentName
    admissionInq.phoneNumber = req.body.phoneNumber
    admissionInq.email = req.body.email
    admissionInq.address = req.body.address
    admissionInq.remark = req.body.remark
    admissionInq.save((err, doc)=>{
        if(!err){
            res.redirect('/')
        }else {
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body)
             
                res.render('inquieries/addOREdit.hbs', {
                    formTitle : 'Admission Inquirey Form',
                    admissionInq : req.body
                })
            }else{
                console.log('error during record insertation:' + err)
            }
        }
    })

}

//validation function for student inq form
function handleValidationError(err, body) {
    for (var field in err.errors) {
        switch (err.errors[field].path) {
            case 'studentName':
                body['studentNameError'] = err.errors[field].message;
                break;
            case 'parentName':
                body['parentNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'phoneNumber':
                body['phoneNumberError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}



class admission {

    

    //admission inq form
    admissionInqGet(req, res){
        res.render('inquieries/addOREdit.hbs', {
            formTitle : 'Admission Inquirey Form'
        })
    }

    // post admission inq form
    admissionInqPost(req, res){
        insertRecord(req, res)// insert record function
    }

    // list admission inq form data in admin panel
    admissionInqList(req, res){
        AdmissionInq.find((err, docs)=>{
            if(!err){
                res.render('inquieries/list.hbs',{
                    list : docs,
                    title: 'Admission inquieries Data'
                })
            }else {
                console.log('err in reteriving list of inquires' + err)
            }
        }).lean();
    }

    // delete admission inq data by id
    admissionInqDelete(req, res){
        AdmissionInq.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) {
                res.redirect('/admission-inq/list');
            }
            else { console.log('Error in admission inq delete :' + err); }
        }).lean();
    }

   


}




module.exports = admission