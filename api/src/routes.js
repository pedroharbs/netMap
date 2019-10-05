const express = require('express')
const routes = express.Router()

/**
 * Middlewares
 */

<<<<<<< HEAD
const Auth = require("./app/middlewares/Auth");
const isAuth = require("./app/middlewares/isAuth");
const FirstAcess = require("./app/middlewares/FirstAcess");
const isFirstAcess = require("./app/middlewares/isFirstAcess");
=======
const PrimeiroLogin = require('./app/middlewares/PrimeiroLogin')
const AuthMiddleware = require('./app/middlewares/AuthMiddleware')
>>>>>>> master

/**
 * Controllers
 */

const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')
const ResetPasswordController = require('./app/controllers/ResetPasswordController')

/**
 * User Routes
 */

<<<<<<< HEAD
routes.post("/firstAcess", FirstAcess, Auth, UserController.store);
routes.get("/isFirstAcess", isFirstAcess);
routes.get("/authenticated", Auth, isAuth);
routes.post("/createSession", SessionController.store);
routes.post("/forgotPassword", ResetPasswordController.store);
routes.post("/resetPassword", ResetPasswordController.update);
=======
routes.post('/createSession', PrimeiroLogin, SessionController.store)
routes.post('/forgotPassword', ResetPasswordController.store)
routes.post('/resetPassword/:token', ResetPasswordController.update)
>>>>>>> master

// Rotas daqui para baixo passarão pelo middleware de verificação de usuário
routes.use(AuthMiddleware)

routes.put('/updateUser/:id', UserController.update)
routes.post('/createUser', UserController.store)
routes.get('/listUsers', UserController.index)
routes.delete('/deleteUser/:id', UserController.destroy)

module.exports = routes