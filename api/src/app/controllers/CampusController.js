const { date } = require("joi");
const Campus = require("../models/Campus");

class CampusController {
  async index(req, res) {
    const campuses = await Campus.find({});

    return res.json(campuses);
  }

  async getById(req, res) {
    const campus = await Campus.findById(req.params.id);

    return res.json(campus);
  }

  async create(req, res) {
    if (req.body.session.level == "Administrador") {
      if (req.body.ip) req.body.ip = req.body.ip.split("_").join("");

      const campus = new Campus({
        name: req.body.name,
        city: req.body.city,
        ip: req.body.ip,
      });

      await campus.save((err) => {
        if (err) {
          return res.status(400).json({
            message: "Invalid inputs.",
            messageUi_PtBr: "Informações inválidas, verifique e tente novamente.",
            error: err
          });
        }

        return res.status(201).json({
          message: "Campus created.",
          messageUi_PtBr: "Campus criado com sucesso!",
        });
      });
    } else {
      return res.status(401).json({
        message: "Permission denied.",
        messageUi_PtBr: "Desculpe, você não tem permissão. Tente novamente."
      });
    }
  }

  async updateById(req, res) {
    if (req.body.session.level == "Administrador") {
      const campus = await Campus.findById(req.params.id);

      campus.name = req.body.name;
      campus.city = req.body.city;
      campus.updateAt = new Date.now();

      await campus.save((err) => {
        if (err) {
          return res.status(400).json({
            message: "Invalid inputs.",
            messageUi_PtBr: "Informações inválidas, verifique e tente novamente.",
            error: err
          });
        }

        return res.status(200).json({
          message: "Campus updated succesfully.",
          messageUi_PtBr: "Campus atualizado com sucesso.",
        });
      });
    } else {
      return res.status(401).json({
        message: "Permission denied.",
        messageUi_PtBr: "Desculpe, você não tem permissão. Tente novamente."
      });
    }
  }

  async destroyById(req, res) {
    if (req.body.session.level == "Administrador") {
      try {
        await Campus.deleteOne({ _id: req.params.id });
        return res.status(200).json({
          message: "Campus deleted succesfully.",
          messageUi_PtBr: "Campus excluído com sucesso.",
        });
      } catch (err) {
        if (err) {
          return res.status(400).json({
            message: "Something wrong in delete.",
            messageUi_PtBr: "Ops! Problema na exclusão. Tente novamente!",
            error: err
          });
        }
      }
    } else {
      return res.status(401).json({
        message: "Permission denied.",
        messageUi_PtBr: "Desculpe, você não tem permissão. Tente novamente."
      });
    }
  }
}

module.exports = new CampusController();
