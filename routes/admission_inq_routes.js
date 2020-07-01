const express = require('express')
const Admission = require('../controller/admission_inq_controller') // controller for routes
const routes = express.Router()



const admission = new Admission()



routes.get('/', admission.admissionInqGet) //admission inq form route

routes.post('/', admission.admissionInqPost) // admission inq post route

routes.get('/list', admission.admissionInqList) // admission inq display data route

routes.get('/delete/:id', admission.admissionInqDelete) // admission inq data delete by id




module.exports = routes