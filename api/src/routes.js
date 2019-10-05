const express = require("express");
const routes = express.Router();

/**
 * Middlewares
 */

const Auth = require("./app/middlewares/Auth");
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

routes.post("/firstAcess", FirstAcess, Auth, UserController.store);
routes.get("/isFirstAcess", isFirstAcess);
routes.get("/authenticated", Auth);
routes.post("/createSession", SessionController.store);
routes.post("/forgotPassword", ResetPasswordController.store);
routes.post("/resetPassword", ResetPasswordController.update);

routes.use(Auth);

routes.put("/updateUser/:id", UserController.update);
routes.post("/createUser", UserController.store);
routes.get("/listUsers", UserController.index);
routes.delete("/deleteUser/:id", UserController.destroy);

module.exports = routes;
