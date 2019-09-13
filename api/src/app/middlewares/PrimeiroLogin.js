const User = require('../models/User')

module.exports = async (req, res, next) => {
  const firstLogin = await User.find();
  const existsFirstLogin = (firstLogin.length == 0) ? true :  false;
  
  req.firstLogin = existsFirstLogin;
    
  if (req.firstLogin) {
    return res.json({ 
      code: 0 
    })
  } else{
    next()
  }

}