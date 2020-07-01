var express = require('express');
var jwt = require('jsonwebtoken');

function usersession (req,res,next)
{
try {
 // var token=req.session.user_token
    var decoded = jwt.verify(  req.session.token1,  "apple");
    next()
  } catch(err) {
    console.log(err)
    res.redirect("/student/login");
  }
  }




  function admin_token (req,res,next)
{
try {
 // var token=req.session.user_token
    var decoded = jwt.verify(  req.session.admin_token,  "apple");
    next()
  } catch(err) {
    console.log(err)
    res.redirect("/student/login");
  }
  }


    
  function teacher_token (req,res,next)
{
try {
 // var token=req.session.user_token
    var decoded = jwt.verify( req.session.teacher_token (req,res,next)
    ,  "apple");
    next()
  } catch(err) {
    console.log(err)
    res.redirect("/student/login");
  }
  }



  module.exports.usersession = usersession;
  module.exports.teacher_token  = teacher_token ;
  module.exports.admin_token = admin_token;
