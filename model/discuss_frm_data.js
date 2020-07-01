var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
 
var quertSchema = new Schema({
 post_id: ObjectId,
  query: {type:String},
  stud_id: {type:String},
 // comment_id:{type:Schema.Types.ObjectId,ref:"Comment"}
 
  
});


var forum = mongoose.model('Discussion_forum',quertSchema );
module.exports=forum