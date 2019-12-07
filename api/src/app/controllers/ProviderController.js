const User = require("../models/User");
const bcrypt = require("bcryptjs");

class ProviderController {
  async index(req, res) {
    const users = await User.find({}, "recordId name email level")
      .nor({
        recordId: req.body.session.recordId
      })
      .populate({ path: "campuses", model: "Campus" });

    return res.json(users);
  }

  async getById(req, res) {
    const user = await User.findOne({
      recordId: req.params.recordId || req.body.session.recordId
    });

    user.password = undefined;
    return res.json(user);
  }

  async store(req, res) {
    if (req.body.isFirstAcess || req.body.session.level == "Administrador") {
      const verifyRecordId = await User.findOne({
        recordId: req.body.recordId
      });
      if (verifyRecordId)
        return res.status(403).json({
          message: "User already exists.",
          messageUi_PtBr: "Desculpe, este prontuário já está cadastrado."
        });

      const verifyEmail = await User.findOne({ email: req.body.email });
      if (verifyEmail)
        return res.status(403).json({
          message: "User already exists.",
          messageUi_PtBr: "Desculpe, este e-mail já está cadastrado."
        });

      const user = new User({
        name: req.body.name,
        recordId: req.body.recordId,
        level: req.body.isFirstAcess ? "Administrador" : req.body.level,
        email: req.body.email,
        password: req.body.password
          ? await bcrypt.hash(req.body.password, 8)
          : "",
        campuses: req.body.campuses
      });

      await user.save(err => {
        if (err) {
          return res.status(400).json({
            message: "Invalid inputs.",
            messageUi_PtBr: "Dados inválidos, verifique e tente novamente.",
            error: err
          });
        }

        return res.status(201).json({
          message: "User created.",
          messageUi_PtBr: "Usuário criado com sucesso!"
        });
      });
    } else {
      return res.status(401).json({
        message: "Permission denied.",
        messageUi_PtBr: "Desculpe, você não tem permissão."
      });
    }
  }

  async updateById(req, res) {
    if (
      req.body.session.recordId === req.params.oldRecordId ||
      req.body.session.level == "Administrador"
    ) {
      if (req.body.recordId !== req.params.oldRecordId) {
        const user = await User.findOne({ recordId: req.body.recordId });
        if (user)
          return res.status(403).json({
            message: "User already exists.",
            messageUi_PtBr: "Desculpe, este prontuário já está cadastrado."
          });
      }

      const user = await User.findOne({ recordId: req.params.oldRecordId });

      if (user.email !== req.body.email) {
        const user = await User.findOne({ email: req.body.email });
        if (user)
          return res.status(403).json({
            message: "User already exists.",
            messageUi_PtBr: "Desculpe, este e-mail já está cadastrado."
          });
      }

      console.log(req.body.campuses);

      user.recordId = req.body.recordId;
      user.name = req.body.name;
      user.email = req.body.email;
      if (req.body.password)
        user.password = await bcrypt.hash(req.body.password, 8);
      user.campuses = req.body.campuses;

      await user.save(err => {
        if (err) {
          return res.status(400).json({
            message: "Invalid inputs.",
            messageUi_PtBr: "Dados inválidos, verifique e tente novamente.",
            error: err
          });
        }

        return res.status(200).json({
          message: "User updated succesfully.",
          messageUi_PtBr: "Usuário atualizado com sucesso."
        });
      });
    } else {
      return res.status(401).json({
        message: "Permission denied.",
        messageUi_PtBr: "Desculpe, você não tem permissão."
      });
    }
  }

  async destroyById(req, res) {
    if (req.body.session.level == "Administrador") {
      try {
        await User.deleteOne({ recordId: req.params.recordId });
        return res.status(200).json({
          message: "User deleted succesfully.",
          messageUi_PtBr: "Usuário excluído com sucesso."
        });
      } catch (err) {
        if (err) {
          return res.status(400).json({
            message: "Something wrong in delete.",
            messageUi_PtBr: "Problema na exclusão. Tente novamente!",
            error: err
          });
        }
      }
    } else {
      return res.status(401).json({
        message: "Permission denied.",
        messageUi_PtBr: "Desculpe, você não tem permissão."
      });
    }
  }
}

module.exports = new ProviderController();
