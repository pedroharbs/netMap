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
const ResetPasswordController = require("./app/controllers/ResetPasswordController");
const UserController = require("./app/controllers/UserController");
const CampusController = require("./app/controllers/CampusController");
const ProviderController = require("./app/controllers/ProviderController");

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
routes.get("/getUser/:recordId*?", UserController.getByRecordId);
routes.put("/updateUser/:oldRecordId", UserController.updateByRecordId);
routes.delete("/deleteUser/:recordId", UserController.destroyByRecordId);

routes.post("/createCampus", CampusController.store);
routes.get("/listCampuses", CampusController.index);
routes.get("/getCampus/:id", CampusController.getById);
routes.put("/updateCampus/:id", CampusController.updateById);
routes.delete("/deleteCampus/:id", CampusController.destroyById);

routes.post("/createProvider", ProviderController.store);
routes.get("/listProviders", ProviderController.index);
routes.get("/getProvider/:id", ProviderController.getById);
routes.put("/updateProvider/:id", ProviderController.updateById);
routes.delete("/deleteProvider/:id", ProviderController.destroyById);


module.exports = routes;
