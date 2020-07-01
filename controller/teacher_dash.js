var express=require('express')
var mongoose = require('mongoose');


//SCHEMA
var Ticket=require('../model/ticket')
var student_login=require('../model/student.js')
var tec_exam=require('../model/tec_exam')
var tec_test=require('../model/tec_test')

//ROUTE
var teacher = express.Router()
teacher.use(express.static('public'))


//TEACHER DASHBOARD
teacher.get('/',(req,res,next)=>
{
    res.render('tec_dash')
})


//TEST MARK
teacher.post('/:type',async (req,res,next)=>
{
    const type=req.params.type
    if(type==="monthly")     //MONTHLY TEST MARK
    {
        var test=await new tec_test({
            _id:mongoose.Types.ObjectId(),
            name:req.body.name,
            student_id:req.body.student_id,
            phy:req.body.phy,
            chem:req.body.che,
            math:req.body.math,
            eng:req.body.eng,
            hindi:req.body.hindi
        })
        console.log(" TEST DATA  :- ", test)
        test.save()
        
    }
    else {

        var test1=await new tec_exam({    //SIX MONTH MARK DETAILS
            _id:mongoose.Types.ObjectId(),
            name:req.body.name,
            student_id:req.body.student_id,
            phy:req.body.phy,
            chem:req.body.che,
            math:req.body.math,
            eng:req.body.eng,
            hindi:req.body.hindi
        })
        console.log("EXAM DATA :-" ,test1)
        test1.save()
    }

    res.redirect('/teacher/')
})


module.exports=teacher