const mongoose = require('mongoose')

var FinalExamSchema = new mongoose.Schema({
    name : {
        type: String,
        required: 'Name is required'
    },
    class : {
        type: Number,
        required: 'Class is required'
    },
    roll_no : {
        type: Number,
        required: 'Roll number is required'
    },
    phy : {
        type: Number
    },
    chm : {
        type: Number
    },
    maths : {
        type: Number
    },
    english : {
        type: Number
    },
    computer : {
        type: Number
    }
})

mongoose.model('Finalexam', FinalExamSchema)