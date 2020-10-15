const Equipament = require("../models/Equipament");

class EquipamentController {
  async index(req, res) {
    const equipaments = await Equipament.find({});

    return res.json(equipaments);
  }

  async create(req, res) {
    if (req.body.session.level == "Administrador") {
      const verifyBrandModel = await Equipament.findOne({
        brand: req.body.brand,
        model: req.body.model,
      });
      if (verifyBrandModel)
        return res.status(403).json({
          message: "Equipament already exists.",
          messageUi_PtBr:
            "Desculpe, um equipamento com esta marca e modelo já existe.",
        });

      if (req.body.linesQuant == 1)
        if (req.body.firstPort != 0 || req.body.firstPort != 1)
          return res.status(500).json({
            messageUi_PtBr:
              "Desculpe, equipamentos com uma linha devem possuir a primeira porta na direita ou esquerda.",
          });

      const equipament = new Equipament({
        brand: req.body.brand,
        model: req.body.model,
        description: req.body.description,
        type: req.body.type,
        portsQuant: req.body.portsQuant,
        linesQuant: req.body.linesQuant,
        firstPort: req.body.firstPort,
      });

      await equipament.save((err) => {
        if (err) {
          return res.status(400).json({
            message: "Invalid inputs.",
            messageUi_PtBr: "Dados inválidos, verifique e tente novamente.",
            error: err,
          });
        }
        return res.status(201).json({
          message: "Equipament created.",
          messageUi_PtBr: "Equipamento criado com sucesso!",
        });
      });
    } else {
      return res.status(401).json({
        message: "Permission denied.",
        messageUi_PtBr: "Desculpe, você não tem permissão.",
      });
    }
  }

  async updateById(req, res) {
    if (req.body.session.level == "Administrador") {
      const verifyBrandModel = await Equipament.findOne({
        brand: req.body.brand,
        model: req.body.model,
      });
      if (verifyBrandModel && verifyBrandModel.id !== req.params.id)
        return res.status(403).json({
          message: "Equipament already exists.",
          messageUi_PtBr:
            "Desculpe, um equipamento com esta marca e modelo já existe.",
        });

      if (req.body.linesQuant == 0 && req.body.firstPort > 1)
        return res.status(500).json({
          message: "Invalid input.",
          messageUi_PtBr:
            "Desculpe, equipamentos com uma linha devem possuir a primeira porta na direita ou esquerda.",
        });

      if (req.body.linesQuant == 1 && req.body.firstPort < 2)
        return res.status(500).json({
          message: "Invalid input.",
          messageUi_PtBr:
            "Desculpe, equipamentos com duas linhas devem possuir a primeira porta nos cantos inferiores ou superiores.",
        });

      const equipament = await Equipament.findById(req.params.id);

      equipament.brand = req.body.brand;
      equipament.model = req.body.model;
      equipament.description = req.body.description;
      equipament.type = req.body.type;
      equipament.portsQuant = req.body.portsQuant;
      equipament.linesQuant = req.body.linesQuant;
      equipament.firstPort = req.body.firstPort;
      equipament.updateAt = new Date.now();

      await equipament.save((err) => {
        if (err) {
          return res.status(400).json({
            message: "Invalid inputs.",
            messageUi_PtBr: "Dados inválidos, verifique e tente novamente.",
            error: err,
          });
        }
        return res.status(200).json({
          message: "Equipament updated succesfully.",
          messageUi_PtBr: "Equipamento atualizado com sucesso!",
        });
      });
    } else {
      return res.status(401).json({
        message: "Permission denied.",
        messageUi_PtBr: "Desculpe, você não tem permissão.",
      });
    }
  }

  async destroyById(req, res) {
    if (req.body.session.level == "Administrador") {
      try {
        await Equipament.deleteOne({ _id: req.params.id });
        return res.status(200).json({
          message: "Equipament deleted succesfully.",
          messageUi_PtBr: "Equipamento excluído com sucesso!",
        });
      } catch (err) {
        if (err) {
          return res.status(400).json({
            message: "Something wrong in delete.",
            messageUi_PtBr: "Problema na exclusão. Tente novamente!",
            error: err,
          });
        }
      }
    } else {
      return res.status(401).json({
        message: "Permission denied.",
        messageUi_PtBr: "Desculpe, você não tem permissão.",
      });
    }
  }
}

module.exports = new EquipamentController();
