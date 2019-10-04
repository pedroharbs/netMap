const User = require("../models/User");

module.exports = async (req, res, next) => {
  User.countDocuments({}).then(count => {
    req.body.firstAcess = count === 0 ? true : false;

    next();
  });
};
