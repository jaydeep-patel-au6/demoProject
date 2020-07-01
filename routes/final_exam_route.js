const express = require('express')

const routes = express.Router()
const FinalExam = require('../controller/final_exam_controller')

const finalExam = new FinalExam()

routes.get('/', finalExam.getfinal) // get data

routes.post('/', finalExam.postfinal) // post form route final exam marks

routes.get('/:id', finalExam.idfinal) // id

routes.get('/delete/:id', finalExam.deletefinal) //delete by id

module.exports = routes


