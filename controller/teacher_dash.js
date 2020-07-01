import express from "express";
import mongoose from "mongoose";

//SCHEMA
import Ticket from "../model/ticket";
import student_login from "../model/student.js";
import tec_exam from "../model/tec_exam";
import tec_test from "../model/tec_test";
import auth from "../middleware/check-auth"
import teacher_model from "../model/teacher";

//ROUTE
var teacher = express.Router();
teacher.use(express.static("public"));

//TEACHER DASHBOARD
teacher.get("/",async (req, res, next) => {
  console.log("Teacher deshboard data   :-", req.session.teachersession_id);
  // var teacher_data = await teacher_model.find({_id: req.session.teachersession_id });
  //console.log("Teacher deshboard data   :-",teacher_data)

  res.render("tec_dash");
});

//TEST MARK
teacher.post("/:type", async (req, res, next) => {
  const type = req.params.type;
  if (type === "monthly") {
    //MONTHLY TEST MARK
    var test = await new tec_test({
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      student_id: req.body.student_id,
      phy: req.body.phy,
      chem: req.body.che,
      math: req.body.math,
      eng: req.body.eng,
      hindi: req.body.hindi,
    });
    console.log(" TEST DATA  :- ", test);
    test.save();
  } else {
    var test1 = await new tec_exam({
      //SIX MONTH MARK DETAILS
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      student_id: req.body.student_id,
      phy: req.body.phy,
      chem: req.body.che,
      math: req.body.math,
      eng: req.body.eng,
      hindi: req.body.hindi,
    });
    console.log("EXAM DATA :-", test1);
    test1.save();
  }

  res.redirect("/teacher/");
});

module.exports = teacher;
