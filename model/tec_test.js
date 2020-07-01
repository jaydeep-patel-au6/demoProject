const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const tec_test = new Schema({
  _id: ObjectId,
  name:{type:String},
  student_id: {type:String,ref:'Stud_Reg'},
  phy:{type:Number},
  chem: {type:Number},
  math:{type:Number},
  eng:{type:Number},
  hindi:{type:Number}
});

const Tec_test = mongoose.model('Tec_test',  tec_test);
module.exports=Tec_test