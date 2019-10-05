const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Joi = require("joi");
const joigoose = require("joigoose")("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

const JoiUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  recordId: Joi.string()
    .required()
    .min(8)
    .max(8),
  level: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
    .regex(
      /(?=.*[}{,.^?~=+\-_\/*\-+.%$&\@!()#|])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}/
    ),
  passwordResetToken: Joi.string(),
  passwordResetExpires: Joi.date(),
  createdAt: Joi.date()
    .required()
    .default(Date.now, "current date")
});

const UserSchema = new mongoose.Schema(joigoose.convert(JoiUserSchema));

UserSchema.pre("save", async function(req, res, next) {
  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  }
};

UserSchema.statics = {
  generateToken({ recordId, level }) {
    return jwt.sign({ recordId, level }, authConfig.secret, {
      expiresIn: authConfig.ttl
    });
  }
};

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", UserSchema);
