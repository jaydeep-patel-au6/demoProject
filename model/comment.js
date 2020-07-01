var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
 
var commentSchema = new Schema({
  _id: ObjectId,
  commentBox: {type:String},
  stud_id12: {type:String}
  
});


var Comment = mongoose.model('Comment',commentSchema );
module.exports=Comment