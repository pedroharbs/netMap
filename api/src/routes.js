const express = require('express')
const routes = express.Router()

/**
 * Middlewares
 */

const PrimeiroLogin = require('./app/middlewares/PrimeiroLogin')

/**
 * Controllers
 */

const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')

/**
 * User Routes
 */

routes.post('/createSession', PrimeiroLogin, SessionController.store)
routes.post('/createUser', UserController.store)
routes.get('/listUsers', UserController.index)
routes.delete('/deleteUser/:id', UserController.destroy)
routes.put('/updateUser/:id', UserController.update)


module.exports = routes