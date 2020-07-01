const express = require('express')
const routes = express.Router()
const Ticket = require('../controller/ticket_controller')

const ticket = new Ticket()

routes.get('/', ticket.getTicket)

module.exports = routes