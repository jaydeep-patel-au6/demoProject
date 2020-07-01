const express = require('express')
const { route } = require('../controller/stu_user')
const routes = express.Router()
const AdminLogin = require('../controller/adminlogin_controller')

const adminLogin = new AdminLogin()

routes.get('/', adminLogin.getHomePage)

module.exports = routes