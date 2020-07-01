var express = require("express");
var mongoose = require("mongoose");
var discuss_frm_data = require("../model/discuss_frm_data");
var comment_data = require("../model/comment");
var forum = express.Router();
//forum.use(express.static('public'))

forum.get("/", async (req, res) => {
  var cpid=req.session.postid
  var data123 = await discuss_frm_data.find();
  var postdata=await comment_data.find({stud_id12 : cpid})
  console.log("comment data  line number 11   :-",postdata)
  res.render("discuss_frm.hbs", { frmQuery: data123,cmdata:postdata });
  console.log("line 16 discuss_frm   :-", data123);
 
  
});





//REPLY

// forum.post("/:id", (req, res) => {
  // console.log("REPLY LINE  15  :-", req.params);
  // var comment_id=req.params.id
  //res.send("done");
  // var comment_box = new comment_data({
    // _id: mongoose.Types.ObjectId(),
    // commentBox: req.body.cb,
    // stud_id12: comment_id,
  // });
 //comment_box.save();
  // console.log("comment data  line 61  :-", comment_box);
// });






//Query
forum.post("/:type/:reply_id1", (req, res) => {
  var cm = req.params.type;
  var oo1 = req.params.reply_id1;
  console.log("param      :", cm);

  //POSTING QUERY

  if (oo1 === "post") {
    var forum = new discuss_frm_data({
      post_id: mongoose.Types.ObjectId(),
      query: req.body.query,
      stud_id: req.session.user_id,
    });

    console.log("FORUM DATA   :-", forum.post_id);

    forum
      .save()
      .then((frm) => {
        console.log("frm   :-", frm);
        req.session.forum_id = frm.post_id;
        console.log("FORUM DATA session id  line 51 :-", req.session.forum_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //COMMENT

  else {
    var comment_box = new comment_data({
      _id: mongoose.Types.ObjectId(),
      commentBox: req.body.cb,
      stud_id12: cm,
    });
    comment_box.save();
    console.log("comment data  line 61  :-", comment_box);
  }
  req.session.postid=cm
  console.log("POST ID OF USER  :-", req.session.postid)

  res.redirect("/discussion");
});


module.exports = forum;
