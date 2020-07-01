var  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const stu_reg = new Schema({
  _id: ObjectId,
  stud_user:{type:String},
  name: {type:String},
  email:{type:String},
  class: {type:Number},
  roll_no: {type:Number},
  adhar_no:{type:Number},
 
  address:{type:String},
  mob_no:{type:Number},
  gender:{type:String}
  
});

const Stud_Reg = mongoose.model('Stud_Reg',stu_reg);

module.exports=Stud_Reg