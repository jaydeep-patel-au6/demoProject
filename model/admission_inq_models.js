const mongoose = require('mongoose')

var admissionInqSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: "Student's name is required"
    },
    parentName: {
        type: String,
        required: "Parent's name is required"
        
    },
    phoneNumber: {
        type: Number,
        
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    remark: {
        type: String
    }
   
})

// Custom validation for email
admissionInqSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Custom validation for mobile number
admissionInqSchema.path('phoneNumber').validate((val) => {
    phoneNumberRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    return phoneNumberRegex.test(val)
}, 'Invalid Phone Number')

mongoose.model('Admission_inquiry', admissionInqSchema)