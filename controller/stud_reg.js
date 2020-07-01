import express from "express";
import auth from "../middleware/check-auth"

//SCHEMA
import stu_reg from "../model/stu_reg";
import stu_id from "../model/student";
import mongoose from "mongoose";
var reg = express.Router();
reg.use(express.static("public"));

//REGISTRATION
reg.get("/reg", (req, res, next) => {
  //console.log("GET ROUTE REGISTRATION PAGE :",req.query._id)

  res.render("stu_reg");
});

reg.post("/reg",(req, res, next) => {
  var reg = new stu_reg({
    _id: mongoose.Types.ObjectId(),
    stud_user: req.session.signup,
    name: req.body.name,
    class: req.body.class,
    roll_no: req.body.roll_no,
    adhar_no: req.body.adhar_no,
    email: req.body.email,
    address: req.body.address,
    mob_no: req.body.mobile_number,
    gender: req.body.gender,
  });
  //console.log(reg)
  reg
    .save()
    .then((data) => {
      req.session.reg = data._id;
      console.log("DATA STUDENT REGISTRATION  :-", data);
      res.redirect("/student/login");
    })
    .catch();
});

module.exports = reg;
