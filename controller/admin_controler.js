import express from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config()
//const passport = require("passport");
//const passportLocalMongoose = require("passport-local-mongoose");
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const findOrCreate = require('mongoose-findorcreate');
var admin = express.Router()

//SCHEMA
var Admin1 = require('../model/admin.js')
admin.use(express.static('public'))
//Admin1.use(passport.initialize());
//Admin1.use(passport.session());

//passport.use(Student.createStrategy());

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });


//   passport.deserializeUser(function(id, done) {
//     Admin1.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });


//   passport.deserializeUser(function(id, done) {
//     Admin1.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });


//   passport.use(new GoogleStrategy({
//     clientID:process.env.CLIENT_ID,
//     clientSecret:process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:5000/student/auth/google/reg",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log("google_auth    -", profile);
    
//     Admin1.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
//   ));


//   //GOOGLE_AUTH

//   admin.get("/auth/google",
// passport.authenticate('google', { scope: ["profile"] })
// );


// admin.get("/auth/google/reg",
// passport.authenticate('google', { failureRedirect: "/student/login" }),
// function(req, res) {
//   //Successful authentication, redirect to secrets.
//   res.redirect('/stu_reg/reg')
// });


  //GOOGLE_AUTH

//   admin.get("/auth/google",
// passport.authenticate('google', { scope: ["profile"] })
// );


// admin.get("/auth/google/reg",
// passport.authenticate('google', { failureRedirect: "/student/login" }),
// function(req, res) {
//   //Successful authentication, redirect to secrets.
//   res.redirect('/stu_reg/reg')
// });

//SIGN_UP
admin.get('/signup', (req, res, next) => {
    res.render('admin_signup.hbs')
})

admin.post('/signup', (req, res, next) => {
    Admin1.find({ admin_email: req.body.email })
        .then((result) => {
            if (result.length>=1) {
               //console.log("EMAIL_ID ALREADY EXIST")
              // res.redirect('/admin/login')
               res.render('admin_signup',{
                title: 'Email-id alrady exist'
              })
              
            }
            else {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    // Store hash in your password DB.
                    if (err) {
                        console.log(err)
                    }
                    else {
                        var Admin12 = new Admin1({
                            _id: mongoose.Types.ObjectId(),
                            admin_name: req.body.user_name,
                            admin_email: req.body.email,
                            admin_password: hash,
                            //googleId: profile.id
                           
                        })
                        Admin12.save()
                            .then((data) => {
                                req.session.signup=data._id
                                console.log("SIGN_UP SESSION",req.session.signup)
                                console.log("SIGN_UP DATA  :-",data)
                                //res.redirect(`/stu_reg/reg?_id=${data._id}`)
                                // passport.authenticate("local")(req,res,function(){
                                    // res.redirect('/stu_reg/reg/')
                                // })
                                res.redirect('/admin/login')
                            })
                        }
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                ERROR: err
            })
            console.log(err)
        })
})

//LOGIN
admin.get('/login', (req, res, next) => {
    res.render('admin_login')
})

admin.post('/login', async (req, res, next) => {
 var adminL =  await Admin1.find({admin_email:req.body.email})
 //console.log('admin login data'+adminL)
    .then((doc)=>
    {
        console.log('admin login data',doc)
        if (doc.length<1)
        {
            res.render("admin_login",{title:"EMAIL_ID NOT FOUND"})
            
               // console("EMAIL_ID NOT FOUND")
            
           // res.redirect('/admin/login')
        }
        else
        {bcrypt.compare(req.body.password, doc[0].admin_password, (err, result)=> {
            console.log(result)
                result == true
                if(result)
                {
                    console.log("yes")
                    var token = jwt.sign({admin_email:doc[0].admin_email,admin_password:doc[0].admin_password }, "apple", { expiresIn:'1h'});
                    console.log("Login token (admin) :- ", token)
                    console.log("LOGIN ID (admin)  :-", doc[0]._id)
                    req.session.user_id=doc[0]._id

                   console.log("Admin SESSION_ID :-",req.session.user_id=doc[0]._id )
                    req.session.admin_token=token
                    res.redirect('/admin-deshboard')
                   
                    //res.redirect(`/dshbrd?_id=${doc[0]._id}`)
                    //res.render('stu_dash',{name:doc.name})
                }
                else{
                    res.render("admin_login",{
                      title2: 'enter password or password doesnot right'
                    })
                }
            });
        }
        
    })
    .catch((err)=>
    {
        console.log(err)
    })   
})






module.exports = admin