const mongoose = require("mongoose");
const Joi = require("joi");
const joigoose = require("joigoose")("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

const JoiUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  recordId: Joi.string().required().min(8).max(8),
  level: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .regex(
      /(?=.*[}{,.^?~=+\-_\/*\-+.%$&\@!()#|])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}/
    ),
  campuses: Joi.array().items(Joi.string()),
  passwordResetToken: Joi.string(),
  passwordResetExpires: Joi.date(),
  createdAt: Joi.date().required().default(Date.now, "current date"),
  updateAt: Joi.date(),
});

const UserSchema = new mongoose.Schema(joigoose.convert(JoiUserSchema));

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },
};

UserSchema.statics = {
  generateToken({ recordId, level }) {
    return jwt.sign({ recordId, level }, authConfig.secret, {
      expiresIn: authConfig.ttl,
    });
  },
};

module.exports = mongoose.model("User", UserSchema);
