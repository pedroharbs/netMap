const User = require("../models/User");
const ResetPassword = require("../jobs/ResetPasswordMail");
const Queue = require("../services/Queue");
const Joi = require("joi");
const crypto = require("crypto");
const moment = require("moment");

class ResetPasswordController {
  async store(req, res) {
    const joiSchema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
    });

    joiSchema.validate(
      {
        email: req.body.email
      },
      err => {
        if (err) {
          return res.status(400).json({
            messageUi_PtBr: "E-mail inválido, verifique e tente novamente.",
            error: err
          });
        }

        User.findOne({ email: req.body.email }).then(async user => {
          if (!user) {
            return res.status(500).json({
              message: "User not exists.",
              messageUi_PtBr: "Este e-mail não corresponde a nenhum usuário."
            });
          }

          const token = crypto.randomBytes(20).toString("hex");
          const expires = moment()
            .add(1, "h")
            .toISOString();

          user.passwordResetToken = token;
          user.passwordResetExpires = expires;

          await user.save();

          await Queue.create(ResetPassword.key, {
            user
          }).save();

          return res.status(201).json({
            message: "E-mail sent.",
            messageUi_PtBr: "E-mail enviado com sucesso!"
          });
        });
      }
    );
  }

  async update(req, res) {
    const joiSchema = Joi.object().keys({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .regex(
          /(?=.*[}{,.^?~=+\-_\/*\-+.%$&\@!()#|])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}/
        ),
      token: Joi.string().required()
    });

    joiSchema.validate(
      {
        email: req.body.email,
        password: req.body.password,
        token: req.body.token
      },
      err => {
        if (err) {
          return res.status(400).json({
            messageUi_PtBr: "Dados inválidos, verifique e tente novamente.",
            error: err
          });
        }

        User.findOne({ email: req.body.email }).then(async user => {
          if (!user) {
            return res.status(500).json({
              message: "User not exists.",
              messageUi_PtBr: "Este e-mail não corresponde a nenhum usuário."
            });
          }

          if (user.passwordResetToken !== req.body.token) {
            return res.status(500).json({
              message: "Token invalid.",
              messageUi_PtBr:
                "Token inválido. Solicite a redefinição de senha novamente."
            });
          }

          if (
            moment(user.passwordResetExpires).isBefore(moment().toISOString())
          ) {
            return res.status(500).json({
              message: "Token expired.",
              messageUi_PtBr:
                "Token expirado. Solicite a redefinição de senha novamente."
            });
          }

          user.password = req.body.password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;

          await user.save();

          return res.status(201).json({
            message: "Password redefined success.",
            messageUi_PtBr: "Senha redefinida com sucesso!"
          });
        });
      }
    );
  }
}

module.exports = new ResetPasswordController();
