const Vlan = require("../models/Vlan");
const Netmask = require("netmask").Netmask;

class VlanController {
  async index(req, res) {
    const vlans = await Vlan.find({});
    return res.json(vlans);
  }

  async getById(req, res) {
    const vlan = await findById(req.params.id);
    return res.json(vlan);
  }

  async create(req, res) {
    if (req.body.ip) req.body.ip = req.body.ip.split("_").join("");

    if (req.body.session.level == "Administrador") {
      const verifyIp = await Vlan.findOne({
        ip: req.body.ip,
      });
      if (verifyIp)
        return res.status(403).json({
          message: "IP already exists.",
          messageUi_PtBr: "Desculpe, já existe uma vlan com esse IP.",
        });

      try {
        const block = new Netmask(req.body.ip + req.body.cidr);
        req.body.mask = block.mask;
      } catch (err) {
        return res.status(400).json({
          message: "Invalid inputs.",
          messageUi_PtBr:
            "Endereço de IP do gateway e/ou broadcast inválido(s), verifique e tente novamente.",
          error: err,
        });
      }

      const vlan = new Vlan({
        vlan_id: req.body.ip.split(".")[2],
        name: req.body.name,
        ip: req.body.ip,
        cidr: req.body.cidr,
        mask: req.body.mask,
        campus: req.body.campus,
        color: req.body.color,
        dhcp: req.body.dhcp,
        vpn: req.body.vpn,
      });

      await vlan.save((err) => {
        if (err) {
          return res.status(400).json({
            message: "Invalid inputs.",
            messageUi_PtBr: "Dados inválidos, verifique e tente novamente.",
            error: err,
          });
        }
        return res.status(201).json({
          message: "Vlan created.",
          messageUi_PtBr: "Vlan criada com sucesso!",
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
      try {
        const block = new Netmask(req.body.ip + req.body.cidr);
      } catch (err) {
        return res.status(400).json({
          message: "Invalid inputs.",
          messageUi_PtBr:
            "Endereço de IP do gateway e/ou broadcast inválido(s), verifique e tente novamente.",
          error: err,
        });
      }

      const vlan = await Vlan.findById(req.params.id);

      vlan.name = req.body.name;
      vlan.campus = req.body.campus;
      if (req.body.color) vlan.color = req.body.color;
      vlan.dhcp = req.body.dhcp;
      vlan.vpn = req.body.vpn;

      await vlan.save((err) => {
        if (err) {
          return res.status(400).json({
            message: "Invalid inputs.",
            messageUi_PtBr: "Dados inválidos, verifique e tente novamente.",
            error: err,
          });
        }
        return res.status(200).json({
          message: "Vlan updated succesfully.",
          messageUi_PtBr: "Vlan atualizada com sucesso!",
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
        await Vlan.deleteOne({ _id: req.params.id });
        return res.status(200).json({
          message: "Vlan deleted succesfully.",
          messageUi_PtBr: "Vlan excluída com sucesso!",
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

module.exports = new VlanController();
