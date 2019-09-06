const express = require('express')
const routes = express.Router()

/**
 * Middlewares
 */

const PrimeiroLogin = require('./app/middlewares/PrimeiroLogin')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')

/**
 * Controllers
 */

const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')
const ResetPasswordController = require('./app/controllers/ResetPasswordController')

/**
 * User Routes
 */

routes.post('/createSession', PrimeiroLogin, SessionController.store)
routes.post('/forgotPassword', ResetPasswordController.store)
routes.post('/resetPassword/:token', ResetPasswordController.update)

// Rotas daqui para baixo passarão pelo middleware de verificação de usuário
routes.use(AuthMiddleware)

routes.put('/updateUser/:id', UserController.update)
routes.post('/createUser', UserController.store)
routes.get('/listUsers', UserController.index)
routes.delete('/deleteUser/:id', UserController.destroy)

module.exports = routes