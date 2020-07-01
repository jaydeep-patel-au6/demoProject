var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
 
var commentSchema = new Schema({
  _id: ObjectId,
  commentBox: {type:String},
  post_id:{type:String}   //same as post_id
  //stud_id12: {type:Schema.Types.ObjectId,ref:"Discussion_forum"}

  
});


var Comment = mongoose.model('Comment',commentSchema );
module.exports=Comment