const express = require('express')
const { route } = require('../controller/stu_user')
const routes = express.Router()
const student1 = require('../controller/register_student_controller')

const student = new student1()

routes.get('/', student.getData) // get studentdata in deshboard route

module.exports = routes