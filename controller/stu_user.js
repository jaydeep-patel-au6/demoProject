import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import mailer from "../utils/nodemailer";

require("dotenv").config();
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";
import auth from "../middleware/check-auth";
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var student = express.Router();

//SCHEMA
var Student = require("../model/student.js");
student.use(express.static("public"));
student.use(passport.initialize());
student.use(passport.session());

//passport.use(Student.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Student.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/student/auth/google/reg",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("google_auth    -", profile);

      // Student.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      Student.findOne({ googleId: profile.id }, function (err, user) {
        if (err) {
          return cb(err);
        } else if (!user) {
          var gauthstudent = new Student({
            _id: mongoose.Types.ObjectId(),
            name: profile.displayName,
            googleId: profile.id,
          });
          gauthstudent.save(function (err) {
            if (err) console.log(err);
            return cb(err, user);
          });
        } else {
          //found user. Return
          return cb(err, user);
        }
      });
    }
  )
);

//GOOGLE_AUTH

student.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

student.get(
  "/auth/google/reg",
  passport.authenticate("google", { failureRedirect: "/stu_reg/reg/" }),
  function (req, res) {
    //Successful authentication, redirect to secrets.
    res.redirect("/stu_reg/reg/");
  }
);

//Forgot user password

// student.get("/forgotpassworduser", (req, res, next) => {
// res.render("forgot_pass.hbs");
// });
//
// student.get("/reset_password/:token",(req,res,next)=>
// {
// res.render("passwordreset")
// })
//
//
//
// student.post('/forgotPassword',async (req,res)=>
// {
// var forgotpassuser = await Student.findOne({ email: req.body.email })
// console.log(forgotpassuser.email)
// var token = jwt.sign(
// { email:forgotpassuser.email },
// process.env.JWTKEY,
// { expiresIn: 60*10 }
// );
//
// var messagepattern=`http://localhost:5000/student/reset_password/${token}`
// var option = {
// email:forgotpassuser.email,
// subject:"Password reset token valid for 10MIN",
//
// message:messagepattern
//
// }
// await mailer(option)
// res.redirect(`/student/reset_password/${token}`)
//
// })
//
//

//SIGN_UP
student.get("/signup", (req, res, next) => {
  res.render("stud_signup.hbs");
});

student.post("/signup", (req, res, next) => {
  Student.find({ email: req.body.email })
    .then((result) => {
      if (result.length >= 1) {
       // res.redirect("/student/login");
        //console.log("EMAIL_ID ALREADY EXIST");
        res.render('Stud_signup',{
          title: 'Email-id alrady exist'})

      } else {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            console.log(err);
          } else {
            var student = new Student({
              _id: mongoose.Types.ObjectId(),
              name: req.body.user_name,
              email: req.body.email,
              password: hash,
            });
            student.save().
            then((data) => {
              req.session.signup = data._id;
              console.log("SIGN_UP SESSION", req.session.signup);
              console.log("SIGN_UP DATA  :-", data);
              //res.redirect(`/stu_reg/reg?_id=${data._id}`)

              res.redirect("/stu_reg/reg/");
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        ERROR: err,
      });
      console.log("SIGN_UP ERROR");
      res.redirect("/student/login");
    });
});

//LOGIN
student.get("/login", (req, res, next) => {
  res.render("Stud_login");
});

student.post("/login", (req, res, next) => {
  Student.find({ email: req.body.email })
    .then((doc) => {
      if (doc.length < 1) {
       
        res.render("Stud_login",{title:"EMAIL_ID NOT FOUND"})
        //console.log("EMAIL_ID NOT FOUND");
      } else {
        bcrypt.compare(req.body.password, doc[0].password, (err, result) => {
          // result == true
          if (result) {
            console.log("yes");
            var token = jwt.sign(
              { email: doc[0].email, password: doc[0].password },
              "apple",
              { expiresIn: "1h" }
            );
            console.log("Login token (stuent) :- ", token);
            console.log("LOGIN ID (STUDENT)  :-", doc[0]._id);
            req.session.user_id = doc[0]._id;

            console.log(
              "STUDENT SESSION_ID :-",
              (req.session.user_id = doc[0]._id)
            );
            req.session.token1 = token;
            res.redirect("/dshbrd/");
            

            //res.redirect(`/dshbrd?_id=${doc[0]._id}`)
            //res.render('stu_dash',{name:doc.name})
          }
          res.render("Stud_login",{title2:" WRONG PASSWORD"})
        });
      }
    })
    .catch((err) => {
      //console.log("login error", err);
      res.redirect("/student/login");
    });
});

module.exports = student;
