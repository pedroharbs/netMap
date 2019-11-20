const User = require("../models/User");

class SessionController {
  store(req, res) {
    console.log(req.session);
    User.findOne({ recordId: req.body.recordId }).then(async user => {
      if (user === null) {
        return res.status(500).json({
          message: "Wrong record. Permission denied.",
          messageUi_PtBr: "Prontuário inválido! Verifique e tente novamente."
        });
      } else {
        const validHash = await user.compareHash(req.body.password);
        if (!validHash) {
          return res.status(500).json({
            message: "Wrong password. Permission denied.",
            messageUi_PtBr: "Senha inválida! Verifique e tente novamente."
          });
        }

        return res.status(200).json({
          auth: true,
          token: User.generateToken(user),
          message: "Login successful!",
          messageUi_PtBr: "Autenticação bem sucedida!"
        });
      }
    });
  }
}

module.exports = new SessionController();
