const Mail = require('../services/Mail')

class ResetPasswordMail {
  get key () {
    return 'ResetPasswordMail'
  }

  async handle (job, done) {
    const { user, token } = job.data

    await Mail.sendMail({
      from: '"netMap" , <netmap@ifsp.edu.br>',
      to: user.email,
      subject: 'Solicitação de Recuperação de senha netMap',
      template: 'ResetPasswordMail',
      context: { user, token }
    }, (err, info) => {
      if (err)
        return res.status(401).json({ message: 'Cannot send forgot password email.' })
    })

    return done()
  }
}

module.exports = new ResetPasswordMail()
