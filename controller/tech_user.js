var express = require('express')
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var teacher = express.Router()


//SCHEMA
var Teacher = require('../model/teacher.js')
teacher.use(express.static('public'))




teacher.get('/signup', (req, res, next) => {
    res.render('Teach_signup.hbs')
})

teacher.get('/tec_dash', (req, res, next) => {
    res.render('tec_dash')
})


//SIGN UP
teacher.post('/signup', (req, res, nest) => {
    Teacher.find({ email: req.body.email })
        .then((result) => {
            if (result.length>=1) {
                console.log("EMAIL_ID ALREADY EXIST")
            }
            else {
                bcrypt.hash(req.body.password, 10, function (err, hash) 
                {
                    // Store hash in your password DB.
                    if (err) {
                        console.log(err)
                    }
                    else {
                        var teacher = new Teacher({
                            _id: mongoose.Types.ObjectId(),
                            name: req.body.user_name,
                            email: req.body.email,
                            password: hash
                        })
                        teacher.save()
                            .then((data) => {
                                console.log(data)
                                res.render('tec_dash', { name: data.name })
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
teacher.get('/login', (req, res, next) => {
    res.render('Teach_login')
})

teacher.post('/login', (req, res, next) => {
    Teacher.find({email:req.body.email})
    .then((doc)=>
    {
        if (doc.length<1)
        {
            console.log("EMAIL_ID NOT FOUND")
        }
        else
        {
            bcrypt.compare(req.body.password, doc[0].password, (err, result)=> {
                // result == true
                if(result)
                {
                    console.log("yes")
                    var token = jwt.sign({email:doc[0].email,password:doc[0].password }, process.env.JWTKEY, { expiresIn:'1h'});
                    console.log(token)
                    res.redirect('tec_dash')

                 //res.status(200).json({message:"LOGIN",token:token})
                    
                }
            });
        }
        
    })
    .catch()   
})


module.exports = teacher