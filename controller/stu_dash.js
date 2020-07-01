import express from "express";
import mongoose from "mongoose";
//SCHEMA
import stu_Reg from "../model/stu_reg";
import stud_User from "../model/student";
import Ticket from "../model/ticket";
import student_test1 from "../model/tec_test";
import student_exam1 from "../model/tec_exam"
import auth from "../middleware/check-auth"
import att_data123 from "../model/student_attendance_model"

//STUDENT DASHBOARD ROUTE
var dash = express.Router();
dash.use(express.static("public"));

//STUDENT_DASHBOARD ROUTE
dash.get("/",auth.usersession,async (req, res, next) => {
  try {
    console.log(req.session.user_id);

    const data = await stu_Reg.find({ stud_user: req.session.user_id });
    var student_attandance_data = await att_data123.findOne({
      student_id: req.session.user_id,
    });
    console.log("attandance data :-", student_attandance_data);
    const data1 = await Ticket.find({ stud_id: req.session.user_id });
    var student_test = await student_test1.find({
      student_id: req.session.user_id,
    });
    var student_exam = await student_exam1.find({
      student_id: req.session.user_id,
    });
    console.log("session_id  :- ", req.session.user_id);
    console.log("STUDENT REGISTRATION DATA  -:", data);
    console.log("TICKET DATA  :-", data1);
    console.log("student test  :-", student_test);
    console.log("student exam  :-", student_exam);
    console.log("Ticket_id :- ", req.session.ticket_id);
    res.render("stu_dash", {
      dashboard_profile_data: data,
      tickets: data1,
      test: student_test,
      exam: student_exam,
      student_attandance_dashbrd_data: student_attandance_data,
    });

    req.session.ticket_id = data1._id;
  } catch (err) {
    console.log(err);
  }
});

//STUDENT_DASHBOARD EDIT
dash.get("/edit/:id", auth.usersession,async (req, res, next) => {
  var id = req.params.id;
  const data = await stu_Reg.findOne({ stud_user: id });
  console.log("dash data", data);
  console.log("edit id  :-", id);
  res.render("stud_edit", { data: data });
});

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

dash.patch("/update",auth.usersession, (req, res, next) => {
  stu_Reg
    .updateOne(
      { stud_user: req.session.user_id },
      {
        name: req.body.name,
        class: req.body.class,
        roll_no: req.body.roll_no,
        adhar_no: req.body.adhar_no,
        email: req.body.email,
        address: req.body.address,
        mob_no: req.body.mobile_number,
        gender: req.body.gender,
      }
    )
    .then((data) => {
      console.log("Update data :-", data);
      res.redirect("/dshbrd/");
    })
    .catch((err) => {
      console.log(err);
    });
});

//STUDENT_DASHBOARD TICKET SECTION
dash.post("/",auth.usersession, (req, res, next) => {
  var ticket = new Ticket({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    concern: req.body.concern,
    stud_id: req.session.user_id,
  });
  console.log("TICKET DATA   :- ", ticket);
  ticket.save().then((data) => {
    res.redirect("/dshbrd/");
  });
});

//DELETE TICKET STATUS
dash.delete("/:id",auth.usersession, (req, res, next) => {
  console.log(req.params.id);
  Ticket.remove({ _id: req.params.id }).then((data) => {
    console.log("Deleted data :-", data);
    res.redirect("/dshbrd/");
  });
});

module.exports = dash;
