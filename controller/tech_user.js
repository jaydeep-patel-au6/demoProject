import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
var teacher = express.Router();

//SCHEMA
import Teacher from "../model/teacher.js";
teacher.use(express.static("public"));

teacher.get("/signup", (req, res, next) => {
  res.render("Teach_signup.hbs");
});

teacher.get("/tec_dash", (req, res, next) => {
  res.render("tec_dash");
});

//SIGN UP
teacher.post("/signup", (req, res, nest) => {
  Teacher.find({ email: req.body.email })
    .then((result) => {
      if (result.length >= 1) {
        res.render('Teach_signup',{
          title: 'Email-id alrady exist'
        })
      } else {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            console.log(err);
          } else {
            var teacher = new Teacher({
              _id: mongoose.Types.ObjectId(),
              name: req.body.user_name,
              email: req.body.email,
              password: hash,
            });
            teacher.save().then((data) => {
              //console.log(data)
              //res.render('tec_dash', { name: data.name })
              res.redirect("/teacher/login");
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        ERROR: err,
      });
      console.log(err);
    });
});

//LOGIN
teacher.get("/login", (req, res, next) => {
  res.render("Teach_login");
});

teacher.post("/login", (req, res, next) => {
  Teacher.find({ email: req.body.email })
    .then((doc) => {
      if (doc.length < 1) {
       // console.log("EMAIL_ID NOT FOUND");
       res.render("Teach_login",{title:"EMAIL_ID NOT FOUND"})
      } else {
        bcrypt.compare(req.body.password, doc[0].password, (err, result) => {
          // result == true
          if (result) {
            //console.log("TEACHER DATA :-" ,doc)
            req.session.teachersession_id = doc[0]._id;
            var token = jwt.sign(
              { email: doc[0].email, password: doc[0].password },
              "apple",
              { expiresIn: "1h" }
            );
            //console.log(token)
            req.session.teacher_token=token
            console.log("TEACHER SESSION_ID:-", req.session.teachersession_id);
            res.redirect("tec_dash");

            //res.status(200).json({message:"LOGIN",token:token})
          }else{
            res.render('Teach_login',{
              title2: 'enter password or password doesnot right'
            })
          }
        });
      }
    })
    .catch();
});

module.exports = teacher;
