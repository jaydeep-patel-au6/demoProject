var express=require('express')
var session = require('express-session')
var mongoose = require('mongoose');
var hbs = require('hbs');
var studentRoute=require('./controller/stu_user.js')
var teacherRoute=require('./controller/tech_user.js')
var studRegRoute=require('./controller/stud_reg')
var studDash=require('./controller/stu_dash')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var teacher=require('./controller/teacher_dash')
var discussion_forum=require('./controller/discuss_formu')
var auth=require('./middleware/check-auth')

//admin
var adminlogin = require('./routes/adminlogin_routes')
var deshboard = require('./routes/admin_deshboard_routes')
var student = require('./routes/register_student_routes')
var anno = require('./routes/announcement_routes')
var timetable = require('./routes/time_table_routes')
var sixMonth = require('./routes/six_month_exam_route')
var final = require('./routes/final_exam_route')
var att = require('./routes/student_attendance_route')
const admission = require('./routes/admission_inq_routes')
const ticket = require('./routes/ticket_route')
const admin = require('./controller/admin_controler')
const announcement = require('./model/anno_model'); 
const { find } = require('./model/admin.js');
const timetable1 = require('./model/timetable_model')

var app=express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)



//VIEW ENGINE
app.set('view engine', 'hbs');
app.set('views', 'views');


//SESSION
app.use(session({
    secret: 'keyboard cat',
    name:"sms",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,maxAge:1000*60*60 }
  }))


//ROUTES
app.use(methodOverride('hemant'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(express.static('public'))
app.use(express.static(__dirname + '/public'))

app.use('/student',studentRoute)
app.use('/teacher',teacherRoute)
app.use('/stu_reg',studRegRoute)
app.use('/dshbrd',studDash)
app.use('/teacher', teacher)
app.use('/discussion',discussion_forum)





//admin'../controllers/six_month_exam_controller')
app.use('/adminlogin', adminlogin)
app.use('/admin-deshboard', deshboard)
app.use('/register-student', student)
app.use('/anno', anno)
app.use('/timetable', timetable)
app.use('/marksix', sixMonth)
app.use('/final', final)
app.use('/att', att)
app.use('/admission-inq', admission)
app.use('/ticket', ticket)
app.use('/admin', admin)



app.use((req,res,next)=>
{var error=new Error('NOT FOUND')
//error.message('NOT FOUND')
next()
})

app.use((error,req,res,next)=>
{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})


//DATABASE_CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/SMS', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//DASHBOARD 
app.get('/',async(req,res)=>

{
  var home_announcement=await announcement.find()
  var TIME_TABLE=await timetable1.find()
  console.log("TIME TABLE DATA :-",TIME_TABLE)
  res.render('home',{
    list2:home_announcement, 
    list1 : TIME_TABLE})
})


//Logout
app.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });



//// Socket 
io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})



//PORT
var port=process.env.PORT || 5000
// app.listen(port,()=>{
    // console.log("SERVER CONNECTED")
// })
http.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
