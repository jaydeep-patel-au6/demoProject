import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import hbs from "hbs";
import studentRoute from "./controller/stu_user.js";
import teacherRoute from "./controller/tech_user.js";
import studRegRoute from "./controller/stud_reg";
import studDash from "./controller/stu_dash";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import teacher from "./controller/teacher_dash";
import discussion_forum from "./controller/discuss_formu";
import auth from "./middleware/check-auth";

//admin
import adminlogin from "./routes/adminlogin_routes";
import deshboard from "./routes/admin_deshboard_routes";
import student from "./routes/register_student_routes";
import anno from "./routes/announcement_routes";
import timetable from "./routes/time_table_routes";
import sixMonth from "./routes/six_month_exam_route";
import final from "./routes/final_exam_route";
import att from "./routes/student_attendance_route";
import admission from "./routes/admission_inq_routes";
import ticket from "./routes/ticket_route";
import admin from "./controller/admin_controler";
import announcement from "./model/anno_model";
import timetable1 from "./model/timetable_model";
const { find } = require("./model/admin.js");

var app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

//VIEW ENGINE
app.set("view engine", "hbs");
app.set("views", "views");

//SESSION
app.use(
  session({
    secret: "keyboard cat",
    name: "sms",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 },
  })
);

//ROUTES
app.use(methodOverride("hemant"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static('public'))
app.use(express.static(__dirname + "/public"));

app.use("/student", studentRoute);
app.use("/teacher", teacherRoute);
app.use("/stu_reg", studRegRoute);
app.use("/dshbrd", studDash);
app.use("/teacher", teacher);
app.use("/discussion", discussion_forum);

//admin'../controllers/six_month_exam_controller')
app.use("/adminlogin", adminlogin);
app.use("/admin-deshboard", deshboard);
app.use("/register-student", student);
app.use("/anno", anno);
app.use("/timetable", timetable);
app.use("/marksix", sixMonth);
app.use("/final", final);
app.use("/att", att);
app.use("/admission-inq", admission);
app.use("/ticket", ticket);
app.use("/admin", admin);

app.use((req, res, next) => {
  var error = new Error("NOT FOUND");
  //error.message('NOT FOUND')
  next();
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//DATABASE_CONNECTION
mongoose.connect("mongodb+srv://hemant1234:hemant@1234@cluster0-fasyy.mongodb.net/SMS?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//DASHBOARD
app.get("/", async (req, res) => {
  var home_announcement = await announcement.find();
  var TIME_TABLE = await timetable1.find();
  console.log("TIME TABLE DATA :-", TIME_TABLE);
  res.render("home", {
    list2: home_announcement,
    list1: TIME_TABLE,
  });
});

//Logout
app.get("/logout", function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

//// Socket
io.on("connection", (socket) => {
  console.log("Connected...");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

//PORT
var port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
