import mongoose from "mongoose";

require("../model/student_attendance_model");
const Att = mongoose.model("Attandance");

class attandance {
  getatt(req, res) {
    Att.find((err, docs) => {
      if (!err) {
        res.render("admin/attendance", {
          list2: docs,
          viewTitle1: "Add attendance",
          viewTitle2: "attendance List",
        });
      } else {
        console.log("Error in retrieving attendance list :" + err);
      }
    }).lean();
  }

  postatt(req, res) {
    if (req.body._id == "") insertRecordatt(req, res);
    // insert data function
    else updateRecordatt(req, res); // update data function
  }

  //find id of anouncement
  idatt(req, res) {
    Att.findById(req.params.id, (err, doc) => {
      res.render("admin/attendance", {
        viewTitle1: "Update attendance",
        viewTitle2: "attendance List",
        att: doc,
      });
    }).lean();
  }

  //delete attendance
  deleteatt(req, res) {
    Att.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        res.redirect("/att");
      } else {
        console.log("Error in att delete :" + err);
      }
    }).lean();
  }
}

//insert att function
function insertRecordatt(req, res) {
  var att = new Att();
  att.name = req.body.name;
  att.class = req.body.class;
  att.roll_no = req.body.roll_no;
  att.student_id = req.body.student_id;
  att.jan = req.body.jan;
  att.feb = req.body.feb;
  att.march = req.body.march;
  att.april = req.body.april;
  att.may = req.body.may;
  att.june = req.body.june;
  att.july = req.body.july;
  att.aug = req.body.aug;
  att.sept = req.body.sept;
  att.oct = req.body.oct;
  att.nov = req.body.nov;
  att.dec = req.body.dec;

  att.save((err, doc) => {
    if (!err) res.redirect("/att");
    else {
      if (err.name == "ValidationError") {
        handleValidationErroratt(err, req.body);
        res.render("admin/attendance", {
          viewTitle1: "add attendance",
          att: req.body,
        });
      } else console.log("Error during attendance record insertion : " + err);
    }
  });
}

//update  function
function updateRecordatt(req, res) {
  Att.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("/att");
      } else {
        console.log("Error during attandance update : " + err);
      }
    }
  );
}

function handleValidationErroratt(err, body) {
  for (var field in err.errors) {
    switch (err.errors[field].path) {
      case "name":
        body["nameError"] = err.errors[field].message;
        break;
      case "class":
        body["classError"] = err.errors[field].message;
        break;
      case "roll_no":
        body["roll_noError"] = err.errors[field].message;
        break;
        case "student_id":
          body["student_idError"] = err.errors[field].message;
          break;
      

      default:
        break;
    }
  }
}

module.exports = attandance;
