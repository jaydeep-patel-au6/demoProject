const express = require('express')
const routes = express.Router()
const Timetable = require('../controller/time_table_controller')


const timetable = new Timetable()

routes.get('/', timetable.getTimetable) // get timetable

routes.post('/', timetable.postTimetable) // post request store data in collection

routes.get('/:id', timetable.idTimetable) // timetABLE id

routes.get('/delete/:id', timetable.deleteTimetable) // TIMETABLE delete by id


module.exports = routes