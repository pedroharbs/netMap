const Mail = require("../services/Mail");

class ResetPasswordMail {
  get key() {
    return "ResetPasswordMail";
  }

  async handle(req, res, done) {
    const { name, email, passwordResetToken } = req.data.user;

    await Mail.sendMail(
      {
        from: '"netMap" , <netmap@ifsp.edu.br>',
        to: email,
        subject: "Solicitação de recuperação de senha do netMap.",
        template: "resetPasswordMail",
        context: {
          name: name,
          token: passwordResetToken
        }
      },
      err => {
        if (err) console.log(err);
      }
    );

    return done();
  }
}

module.exports = new ResetPasswordMail();
