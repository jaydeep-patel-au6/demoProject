var mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
 
var adminSchema = new Schema({
 _id: ObjectId,
  admin_name: {type:String},
  admin_email: {type:String},
  admin_password: {type:String},
  //googleId: String,
  //role:{type:String}
});

//studentSchema.plugin(passportLocalMongoose);
//studentSchema.plugin(findOrCreate);

var Admin = mongoose.model('Admin', adminSchema);
module.exports=Admin