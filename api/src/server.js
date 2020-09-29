require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Youch = require("youch");
const validate = require("express-validation");
const databaseConfig = require("./config/database");

class App {
  constructor() {
    this.app = express();

    this.database();
    this.middlewares();
    this.routes();
    this.exception();
  }

  database() {
    mongoose.connect(databaseConfig.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  routes() {
    this.app.use(require("./routes"));
  }

  exception() {
    // this.app.use(async (err, req, res, next) => {
    //   if (err instanceof validate.ValidationError) {
    //     return res.status(err.status).json(err)
    //   }
    //   if (process.env.NODE_ENV !== 'production') {
    //     const youch = new Youch(err, req)
    //     return res.json(await youch.toJSON())
    //   }
    //   return res.status(err.status || 500).json({
    //     error: 'Internal Server Error'
    //   })
    // })
  }
}

module.exports = new App().app;
