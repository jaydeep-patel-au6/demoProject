const express = require('express')
const routes = express.Router()
const Anno = require('../controller/announcement_controller')

const anno = new Anno()

routes.get('/', anno.getAnno) // announcemnet form route

routes.patch('/', anno.postAnno) // announcement form post route

routes.get('/:id', anno.idAnno) // announcement id

routes.get('/delete/:id', anno.deleteAnno) // announcement delete by id



module.exports = routes