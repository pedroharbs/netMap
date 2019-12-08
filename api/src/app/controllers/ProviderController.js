const Provider = require("../models/Provider");
const bcrypt = require("bcryptjs");
const Netmask = require("netmask").Netmask;

class ProviderController {
  async index(req, res) {
    const providers = await Provider.find(
      {},
      "name ip cidr mask gateway broadcast ipRange"
    );
    return res.json(providers);
  }

  async getById(req, res) {
    const provider = await Provider.findById(req.params.id);
    return res.json(provider);
  }

  async store(req, res) {
    if (req.body.ip) req.body.ip = req.body.ip.split("_").join("");

    const verifyIp = await Provider.findOne({
      ip: req.body.ip
    });
    if (verifyIp)
      return res.status(403).json({
        message: "IP already exists.",
        messageUi_PtBr:
          "Desculpe, já existe um provedor de internet com esse IP."
      });

    try {
      const block = new Netmask(req.body.ip + req.body.cidr);
      req.body.gateway = block.first;
      req.body.broadcast = block.last;
      req.body.mask = block.mask;
      req.body.ipRange = block.forEach(ip => ip);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid inputs.",
        messageUi_PtBr:
          "Endereço de IP e/ou CIDR incorreto(s), verifique e tente novamente.",
        error: err
      });
    }

    const provider = new Provider({
      name: req.body.name,
      ip: req.body.ip,
      cidr: req.body.cidr,
      mask: req.body.mask,
      gateway: req.body.gateway,
      broadcast: req.body.broadcast,
      ipRange: req.body.ipRange
    });

    await provider.save(err => {
      if (err) {
        return res.status(400).json({
          message: "Invalid inputs.",
          messageUi_PtBr: "Dados inválidos, verifique e tente novamente.",
          error: err
        });
      }

      return res.status(201).json({
        message: "Provider created.",
        messageUi_PtBr: "Provedor de internet criado com sucesso!"
      });
    });
  }

  async updateById(req, res) {
    const provider = await Provider.findById(req.params.id);

    try {
      const gateway = new Netmask(req.body.gateway + req.body.cidr);
      const broadcast = new Netmask(req.body.broadcast + req.body.cidr);
    } catch (err) {
      return res.status(400).json({
        message: "Invalid inputs.",
        messageUi_PtBr:
          "Endereço de IP do gateway e/ou broadcast inválido(s), verifique e tente novamente.",
        error: err
      });
    }

    provider.name = req.body.name;
    provider.gateway = req.body.gateway;
    provider.broadcast = req.body.broadcast;
    provider.ipRange = req.body.ipRange;

    await provider.save(err => {
      if (err) {
        return res.status(400).json({
          message: "Invalid inputs.",
          messageUi_PtBr: "Dados inválidos, verifique e tente novamente.",
          error: err
        });
      }

      return res.status(200).json({
        message: "Provider updated succesfully.",
        messageUi_PtBr: "Provedor de internet atualizado com sucesso!"
      });
    });
  }

  async destroyById(req, res) {
    try {
      await Provider.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        message: "Provider deleted succesfully.",
        messageUi_PtBr: "Provedor de internet excluído com sucesso!"
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
  }
}

module.exports = new ProviderController();
