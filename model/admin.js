var mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
 
var adminSchema = new Schema({
 _id: ObjectId,
  admin_name: {type:String,required:true},
  admin_email: {type:String,required:true},
  admin_password: {type:String,required:true},
  //googleId: String,
  //role:{type:String}
});

//studentSchema.plugin(passportLocalMongoose);
//studentSchema.plugin(findOrCreate);

var Admin = mongoose.model('Admin', adminSchema);
module.exports=Admin