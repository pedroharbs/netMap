const User = require("../models/User");

class SessionController {
  store(req, res) {
    User.findOne({ recordId: req.body.recordId }).then(async user => {
      if (user === null) {
        return res.status(500).json({
          message: "Permission denied.",
          messageUi_PtBr: "Dados incorretos! Verifique e tente novamente."
        });
      } else {
        const validHash = await user.compareHash(req.body.password);
        if (!validHash) {
          return res.status(500).json({
            message: "Permission denied.",
            messageUi_PtBr: "Dados incorretos! Verifique e tente novamente."
          });
        }

        return res.status(200).json({
          auth: true,
          token: User.generateToken(user),
          message: "Login successful!",
          messageUi_PtBr: "Login efetuado com sucesso!"
        });
      }
    });
  }
}

module.exports = new SessionController();
