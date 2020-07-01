var mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
 
var studentSchema = new Schema({
 _id: ObjectId,
  name: {type:String},
  email: {type:String},
  password: {type:String},
  googleId: String,
  //role:{type:String}
});

studentSchema.plugin(passportLocalMongoose);
studentSchema.plugin(findOrCreate);

var Student = mongoose.model('Student',studentSchema);
module.exports=Student