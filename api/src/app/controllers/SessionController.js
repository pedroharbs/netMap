const User = require('../models/User')

class SessionController {
  async store (req, res) {
    const { schoolRecord, password } = req.body

    const user = await User.findOne({ schoolRecord })

    if (!user) {
      return res.status(200).json({ 
        message: 'User not found.' 
      })
    }

    if (!await user.compareHash(password)){
      return res.status(200).json({ 
        message: 'Password incorrect' 
      })
    }
    
    return res.json({ 
      auth: true,
      token : User.generateToken(user) 
    })
  }
}

module.exports = new SessionController()