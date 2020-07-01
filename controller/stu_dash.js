var express = require('express')
var mongoose = require('mongoose');


//SCHEMA
var stu_Reg = require('../model/stu_reg')
var stud_User = require('../model/student')
var Ticket = require('../model/ticket')
var student_test1 = require('../model/tec_test')
var student_exam1 = require('../model/tec_exam')
var att_data = require('../model/student_attendance_model')


//STUDENT DASHBOARD ROUTE
var dash = express.Router()
dash.use(express.static('public'))


//STUDENT_DASHBOARD ROUTE
dash.get('/', async (req, res, next) => {
    try {
        console.log(req.session.user_id)

        const data = await stu_Reg.find({ stud_user: req.session.user_id })
        var attandance_data=await att_data.find({ student_id: req.session.user_id })
        console.log("attandance data :-", attandance_data)
        const data1 = await Ticket.find({ stud_id: req.session.user_id })
    var student_test = await student_test1.find({ student_id: req.session.user_id })
    var student_exam = await student_exam1.find({ student_id: req.session.user_id })
        console.log("session_id  :- ", req.session.user_id)
        console.log("STUDENT REGISTRATION DATA  -:", data)
        console.log("TICKET DATA  :-", data1)
        console.log("student test  :-", student_test)
        console.log("student exam  :-", student_exam)
        res.render('stu_dash',{
           name: data[0].name,  class: data[0].class, roll_no: data[0].roll_no,
            adhar_no: data[0].adhar_no, email: data[0].email, address: data[0].address,
           gender: data[0].gender, id: data[0].stud_user, mobile_number: data[0].mob_no,
           tickets: data1,test:student_test, exam:student_exam,})
        console.log("Ticket_id :- ", req.session.ticket_id)
        req.session.ticket_id = data1._id

    }
    catch (err) {console.log(err)}
})




//STUDENT_DASHBOARD EDIT 
dash.get('/edit/:id', async (req, res, next) => {
    var id = req.params.id
    const data = await stu_Reg.findOne({ stud_user: id })
    console.log("dash data", data)
    console.log("edit id  :-", id)
    res.render('stud_edit', { data: data })
})


//STUDNT_DASHBOARD UPDATE (UPDATING DATA USING WITHOUT PATCH METHOD)

// dash.post('/update', (req, res, next) => {
// stu_Reg.updateOne({ stud_user: req.session.user_id }, {
// name: req.body.name,
// class: req.body.class,
// roll_no: req.body.roll_no,
// adhar_no: req.body.adhar_no,
// email: req.body.email,
// address: req.body.address,
// mob_no: req.body.mob_no,
// gender: req.body.gender
// })
// 
// .then((data) => {
// console.log("Update data :-", data)
// res.redirect('/dshbrd/')
// })
// .catch((err) => {
// console.log(err)
// })
// 
// })


//UPDATING DATA USING  PATCH METHOD

dash.patch('/update', (req, res, next) => {
    stu_Reg.updateOne({ stud_user: req.session.user_id }, {
        name: req.body.name,
        class: req.body.class,
        roll_no: req.body.roll_no,
        adhar_no: req.body.adhar_no,
        email: req.body.email,
        address: req.body.address,
        mob_no: req.body.mobile_number,
        gender: req.body.gender
    })
    .then((data)=>
        {
            console.log("Update data :-", data)
            res.redirect('/dshbrd/')
        })
    .catch((err) => {console.log(err)})
    })
    
    
//STUDENT_DASHBOARD TICKET SECTION
dash.post('/', (req, res, next) => {
    var ticket = new Ticket({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        concern: req.body.concern,
        stud_id: req.session.user_id
    })
    console.log("TICKET DATA   :- ", ticket)
    ticket.save()
        .then((data) => {
            res.redirect('/dshbrd/')
        })
    })
    
    
//DELETE TICKET STATUS
dash.delete('/:id', (req, res, next) => {
    console.log(req.params.id)
    Ticket.remove({ _id: req.params.id })
        .then((data) => {
            console.log("Deleted data :-", data)
            res.redirect('/dshbrd/')
        })
})


module.exports = dash