const User = require("../models/User");

class UserController {
  async index(req, res) {
    const users = await User.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 20,
        select: "record name email level createdAt",
        sort: "-createdAt"
      }
    );

    return res.json(users);
  }

  async getByRecordId(req, res) {
    const user = await User.findOne({
      recordId: req.query.recordId || req.body.session.recordId
    });

    return res.json(user);
  }

  async store(req, res) {
    if (req.body.isFirstAcess || req.body.session.level == "Administrador") {
      if (await User.findOne(req.body)) {
        return res.status(403).json({
          message: "User already exists.",
          messageUi_PtBr: "Usuário já cadastrado."
        });
      }

      const user = new User({
        name: req.body.name,
        recordId: req.body.recordId,
        level: req.body.isFirstAcess ? "Administrador" : req.body.level,
        email: req.body.email,
        password: req.body.password
      });

      await user.save(err => {
        if (err) {
          return res.status(400).json({
            messageUi_PtBr: "Dados inválidos, verifique e tente novamente.",
            error: err
          });
        }

        return res.status(201).json({
          message: "User created.",
          messageUi_PtBr: "Bem vindo ao netMap!"
        });
      });
    } else {
      return res.status(401).json({
        message: "Permission denied.",
        messageUi_PtBr: "Desculpe, você não tem permissão."
      });
    }
  }

  async updateByRecordId(req, res) {
    if (req.body.password === "") delete req.body.password;
    const user = await User.findOneAndUpdate(
      { recordId: req.body.recordId },
      req.body,
      { new: true }
    );

    return res.status(200).json({
      message: "User updated succesfully.",
      message: "Usuário atualizado com sucesso.",
      recordId: user.recordId
    });
  }

  async destroy(req, res) {
    if (req.body.session.level == "Administrador") {
      await User.findByIdAndDelete(req.query.id);

      return res.status(200).json({
        message: "User deleted succesfully."
      });
    }

    return res.status(401).json({
      message: "Permission denied."
    });
  }
}

module.exports = new UserController();
