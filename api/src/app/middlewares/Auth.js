const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = (req, res, next) => {
  if (req.body.firstAcess) {
    next();
  } else {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        auth: false,
        message: "No token provided.",
        messageUi_PtBr: "Token inexistente."
      });
    }

    const parts = authHeader.split(" ");
    if (!parts.lenght === 2) {
      return res.status(401).send({
        auth: false,
        message: "Token error.",
        messageUi_PtBr: "Token inválido."
      });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({
        auth: false,
        message: "Token malformated.",
        messageUi_PtBr: "Token mal formatado."
      });
    }

    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          auth: false,
          message: "Token invalid.",
          messageUi_PtBr: "Token inválido.",
          error: err
        });
      }

      req.recordId = decoded.recordId;
      req.level = decoded.level;

      next();
    });
  }
};
