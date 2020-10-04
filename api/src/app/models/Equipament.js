const mongoose = require("mongoose");
const Joi = require("joi");
const joigoose = require("joigoose")("mongoose");

const JoiEquipamentSchema = Joi.object().keys({
  brand: Joi.string().required(),
  model: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string().required(),
  portsQuant: Joi.number().integer().required().max(96),
  linesQuant: Joi.string().required(),
  firstPort: Joi.string().required(),
  createdAt: Joi.date().required().default(Date.now, "current date"),
  updateAt: Joi.date(),
});

const EquipamentSchema = new mongoose.Schema(
  joigoose.convert(JoiEquipamentSchema)
);

module.exports = mongoose.model("Equipament", EquipamentSchema);
