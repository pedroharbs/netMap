module.exports = (req, res) => {
  return res.status(200).send({
    auth: true,
    message: "Authentication valid."
  });
};
