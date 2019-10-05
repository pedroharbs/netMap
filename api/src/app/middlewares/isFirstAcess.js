const User = require("../models/User");

module.exports = (req, res) => {
  User.countDocuments({}).then(count => {
    const isFirstAcess = count === 0 ? true : false;
    res.status(200).send({
      isFirstAcess
    });
  });
};
