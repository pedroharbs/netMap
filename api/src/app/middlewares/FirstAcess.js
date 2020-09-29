const User = require("../models/User");

module.exports = (req, res, next) => {
  User.estimatedDocumentCount().then(count => {
    req.body.isFirstAcess = count === 0 ? true : false;

    if (req.body.isFirstAcess) {
      next();
    } else {
      res.status(200).send({
        isFirstAcess: req.body.firstAcess
      });
    }
  });
};
