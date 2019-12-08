const mongoose = require("mongoose");
const Joi = require("joi");
const joigoose = require("joigoose")("mongoose");

const JoiProviderSchema = Joi.object().keys({
  name: Joi.string().required(),
  ip: Joi.string().required(),
  cidr: Joi.string().required(),
  mask: Joi.string().required(),
  gateway: Joi.string().required(),
  broadcast: Joi.string().required(),
  ipRange: Joi.array().items(Joi.string().required(), Joi.string()),
  createdAt: Joi.date()
    .required()
    .default(Date.now, "current date")
});

const ProviderSchema = new mongoose.Schema(joigoose.convert(JoiProviderSchema));

module.exports = mongoose.model("Provider", ProviderSchema);
