//create datastructure

const mongoose = require('mongoose')

var songSchema = new mongoose.Schema({
    songName : {
        type : String,
        
    },
    singerName : {
        type : String
    },
    gener : {
        type : String 
    },
    duration : {
        type : Number
    },
    ratings : {
        type : Number
    }
})



mongoose.model('Song', songSchema)