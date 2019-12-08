const mongoose = require("mongoose");
const Joi = require("joi");
const joigoose = require("joigoose")("mongoose");

const JoiVlanSchema = Joi.object().keys({
  vlan_id: Joi.string().required(),
  name: Joi.string().required(),
  ip: Joi.string().required(),
  cidr: Joi.string().required(),
  mask: Joi.string().required(),
  campus: Joi.string().required(),
  color: Joi.string().required(),
  dhcp: Joi.boolean().required(),
  vpn: Joi.boolean().required(),
  createdAt: Joi.date()
    .required()
    .default(Date.now, "current date")
});

const VlanSchema = new mongoose.Schema(joigoose.convert(JoiVlanSchema));

module.exports = mongoose.model("Vlan", VlanSchema);
