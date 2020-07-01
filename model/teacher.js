var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
 
var teacherSchema = new Schema({
  _id: ObjectId,
  name: {type:String,required:true},
  email: {type:String,required:true},
  password: {type:String,required:true}
});


var Teacher = mongoose.model('Teacher',teacherSchema);
module.exports=Teacher