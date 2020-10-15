const mongoose = require("mongoose");
const Joi = require("joi");
const joigoose = require("joigoose")("mongoose");

const JoiCampusSchema = Joi.object().keys({
  name: Joi.string().required(),
  city: Joi.string().required(),
  ip: Joi.string().required(),
  createdAt: Joi.date().required().default(Date.now, "current date"),
  updateAt: Joi.date(),
});

const CampusSchema = new mongoose.Schema(joigoose.convert(JoiCampusSchema));

module.exports = mongoose.model("Campus", CampusSchema);
