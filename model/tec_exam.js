const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const tec_exam = new Schema({
  _id: ObjectId,
  student_id: {type:String, ref:'Stud_Reg'},
  name:{type:String},
  phy:{type:Number},
  chem: {type:Number},
  math:{type:Number},
  eng:{type:Number},
  hindi:{type:Number}
});

const Tec_exam = mongoose.model('Tec_exam', tec_exam);
module.exports=Tec_exam