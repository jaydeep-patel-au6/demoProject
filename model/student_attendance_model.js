const mongoose = require('mongoose')

var attSchema = new mongoose.Schema({
    name:{
        type: String,
        required: 'Name is required'
    },
    class:{
        type: Number,
        required: 'class is required'
    },
    roll_no:{
        type: Number,
        required: 'roll_no is required'
    },
    student_id: {type:String, ref:'Stud_Reg'},
    jan:{
        type: Number
    },
    feb:{
        type: Number
    },
    march:{
        type: String
    },
    april:{
        type: String
    },
    may:{
        type: String
    },
    june:{
        type: String
    },
    july:{
        type: String
    },
    aug:{
        type: String
    },
    sept:{
        type: String
    },
    oct:{
        type: String
    },
    nov:{
        type: String
    },
    dec:{
        type: String
    }

    
   
})

module.exports = mongoose.model('Attandance', attSchema)