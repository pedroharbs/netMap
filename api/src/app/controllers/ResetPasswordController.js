const User = require('../models/User')
const ResetPassword = require('../jobs/ResetPasswordMail')
const Queue = require('../services/Queue')
const Joi = require('joi')
const crypto = require('crypto')

class ResetPasswordController {
  async store (req, res) {

    // Valida usando Joi
    const schemaForgottenPassword = Joi.object().keys({
      email: Joi.string().email().required()
    })

    // Resultado validação
    const resultForgottenData = schemaForgottenPassword.validate({ 
      email: req.body.email, 
    }, async (err, result) => {
      
      if (err === null) {

        const { email } = result
        
        // Contém dados do usuário que está requisitando senha
        const userForgot = await User.findOne({ email })
        
        if (!userForgot) {
          return res.status(400).json({ message: 'User not found.' })
        }

        const token = crypto.randomBytes(20).toString('hex')
        const now = new Date()
        now.setHours(now.getHours() + 1)

        await User.findByIdAndUpdate(userForgot.id, {
          '$set': {
            passwordResetToken: token,
            passwordResetExpires: now
          }
        })

        Queue.create(ResetPassword.key, {
          user: userForgot,
          token
        }).save()
      }
  
      return res.send(err || { message: 'Password recovery email sent successfully.' })
    });

  }

  async update (req, res) {
    // Valida usando Joi
    const schemaForgottenPassword = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().regex(/(?=.*[}{,.^?~=+\-_\/*\-+.%$&\@!()#|])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}/),
      token: Joi.string(),
    })

    // Resultado validação
    const resultForgottenData = schemaForgottenPassword.validate({ 
      email: req.body.email, 
      token: req.params.token,
      password: req.body.password
    }, async (err, result) => {
      
      if (err === null) {

        const { email, password, token } = result
        
        // Contém dados do usuário que está requisitando senha
        const userReset = await User.findOne({ email })
        .select('passwordResetToken passwordResetExpires')
        
        if (!userReset) {
          return res.status(400).json({ 
            message: 'User not found.' 
          })
        }
        
        if (token !== userReset.passwordResetToken){
          return res.status(400).json({ 
            message: 'Token invalid.'
          })
        }

        const now = new Date()

        if (now > userReset.passwordResetExpires){
          return res.status(400).json({ 
            message: 'Token expired, generate a new one.' 
          })
        }

        userReset.password = password
        userReset.passwordResetToken = 'NO_TOKEN'

        await userReset.save()
      }

      return res.send(err || { message: 'Password changed successfully.' })
    })
  }
}

module.exports = new ResetPasswordController()
