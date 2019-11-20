const express = require("express");
const routes = express.Router();

/**
 * Middlewares
 */

const Auth = require("./app/middlewares/Auth");
const isAuth = require("./app/middlewares/isAuth");
const FirstAcess = require("./app/middlewares/FirstAcess");
const isFirstAcess = require("./app/middlewares/isFirstAcess");

/**
 * Controllers
 */

const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/UserController");
const ResetPasswordController = require("./app/controllers/ResetPasswordController");

/**
 * User Routes
 */

routes.post("/firstAcess", FirstAcess, UserController.store);
routes.get("/isFirstAcess", isFirstAcess);
routes.get("/authenticated", Auth, isAuth);
routes.post("/createSession", SessionController.store);
routes.post("/forgotPassword", ResetPasswordController.store);
routes.post("/resetPassword", ResetPasswordController.update);

routes.use(Auth);

routes.post("/createUser", UserController.store);
routes.get("/listUsers", UserController.index);
routes.get("/getUser", UserController.getByRecordId);
routes.put("/updateUser", UserController.updateByRecordId);
routes.delete("/deleteUser", UserController.destroy);

module.exports = routes;
