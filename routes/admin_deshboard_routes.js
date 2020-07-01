const express = require('express')
const routes = express.Router()
const Deshboard = require('../controller/admin_deshboard_controller')

const deshboard = new Deshboard()

routes.get('/', deshboard.gethomepage)

module.exports = routes