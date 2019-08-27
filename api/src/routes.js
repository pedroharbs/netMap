const express = require('express')

const routes = express.Router()

const PrimeiroLogin = require('./app/middlewares/PrimeiroLogin')

const SessionController = require('./app/controllers/SessionController')

routes.get('/', PrimeiroLogin, SessionController.store)

module.exports = routes