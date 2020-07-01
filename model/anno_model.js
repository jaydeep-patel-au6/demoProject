 
const mongoose = require('mongoose')

var announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is Empty'
    },
    note: {
        type: String,
        required: 'Note is Empty'
    },
    time : { type: Date, default: Date.now } 
    
   
})

module.exports = mongoose.model('Announcement', announcementSchema)