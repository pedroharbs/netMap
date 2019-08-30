const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const Joi = require('joi')
const joigoose = require('joigoose')('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

// Schema utilizando joigoose
const JoiUserSchema = Joi.object().keys({
    name: Joi.string().required(),
    schoolRecord: Joi.string().required().min(8),
    level: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().regex(/(?=.*[}{,.^?~=+\-_\/*\-+.%$&\@!()#|])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}/),
    createdAt: Joi.date().required().default(Date.now, 'current date')
})

// Conversão do schema de joi para mongoose
const UserSchema = new mongoose.Schema(joigoose.convert(JoiUserSchema))

// Hook acontecendo antes de todo save do usuário(criação e update)
UserSchema.pre(('save'), async function (next) {
  // Se senha não foi alterada prossegue
  if (!this.isModified('password')) {
    return next()
  }

  // Se senha foi alterada, retorna hash
  this.password = await bcrypt.hash(this.password, 8)
})

// Metódos que quero que todas instâncias de usuário tenham
UserSchema.methods = {
  // Recebe senha criptografada e compara se ela bate com a senha dentro da instância do usuário
  compareHash (password) {
    return bcrypt.compare(password, this.password)
  },
}

// Método estático do model User
UserSchema.statics = {
  generateToken ({ id, level }) {
    return jwt.sign({ id, level }, authConfig.secret, {
      expiresIn: authConfig.ttl
    })
  }
}

UserSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('User', UserSchema)
