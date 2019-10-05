module.exports = (req, res, next) => {
  return res.status(200).send({
    auth: true,
    message: "Authentication valid."
  });
};
