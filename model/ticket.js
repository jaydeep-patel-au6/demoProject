const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const Ticket_Schema = new Schema({
  _id: ObjectId,
  stud_id:{type:String},
  title: {type:String},
  concern: {type:String},
  status:{type:Boolean, default:false}
  
});

const Ticket = mongoose.model('Ticket', Ticket_Schema);
module.exports=Ticket