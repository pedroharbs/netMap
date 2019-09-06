module.exports = async (req, res, next) => {
  const firstLogin = process.env.FIRST_LOGIN

  if (firstLogin == 0) {
    return res.json({ 
      code: 0 
    })
  } else{
    next()
  }

}