const mongoose = require('mongoose')


var TimeTableSchema = new mongoose.Schema({
    
    class: {
        type: Number,
        required: 'Class number is Empty'
    },
    day: {
        type: String,
        required: 'Day required'
    },
    session1: {
        type: String,
        required: 'session 1 is Empty'
    },
    teacher1:{
        type: String,
        required: 'session 1 teacher name is empty'
    }, 
    session2: {
        type: String,
        required: 'session 2 is Empty'
    },
    teacher2:{
        type: String,
        required: 'session 2 teacher name is empty'
    }

    
   
})

module.exports = mongoose.model('Timetable', TimeTableSchema)