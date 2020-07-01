import express from "express";
import mongoose from "mongoose";
import discuss_frm_data from "../model/discuss_frm_data";
import comment_data from "../model/comment";

var forum = express.Router();
//forum.use(express.static('public'))

forum.get("/", async (req, res) => {
  var cpid=req.session.postid
 //var data123 = await discuss_frm_data.find({}).populate("comment_id")  //COLLECTING POST DATA 
   var data1234 = await discuss_frm_data.aggregate([
  // {$match:{"post_id":"5ef683f540f2e035acbd22b1"}},
  {$lookup:
      {
        from:"comment_data",
      localField:"5ef68a3c10ace92bcc218b93",
      foreignField:"5ef68a3c10ace92bcc218b93",
      as: "COMBODATA_POST_QUERY"
    }
  }])


  var postdata=await comment_data.find({stud_id12 : cpid})  //COLLECTING COMMENT 
  console.log("comment data  line number 11   :-",postdata)
  res.render("discuss_frm.hbs", {
    frmQuery: data1234,
   cmdata:postdata 
    });
  console.log("line 16 discuss_frm   :-", data1234);
 });





//Query
forum.post("/:type/:reply_id1", (req, res) => {
  var cm = req.params.type;   //POST_ID
  var oo1 = req.params.reply_id1;   //CHECKING CONDITION
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
      post_id: cm,
    });
    comment_box.save();
    console.log("comment data  line 61  :-", comment_box);
  }
  req.session.postid=cm
  console.log("POST ID OF USER  :-", req.session.postid)

  res.redirect("/discussion");
});



















module.exports = forum;
