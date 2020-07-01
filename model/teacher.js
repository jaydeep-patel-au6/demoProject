var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
 
var teacherSchema = new Schema({
  _id: ObjectId,
  name: {type:String},
  email: {type:String},
  password: {type:String}
});


var Teacher = mongoose.model('Teacher',teacherSchema);
module.exports=Teacher