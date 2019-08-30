const User = require('../models/User')
const jwt = require('jsonwebtoken')

class UserController {

  async index (req, res) {
    const users = await User.paginate({}, {
      page: req.query.page || 1,
      limit: 20,
      sort: '-createdAt'
    })

    return res.json(users)
  }

  async store (req, res) {
    var token = req.headers['authorization'];
    
    if (!token) {
      return res.status(401).send({ 
        auth: false, 
        message: 'No token provided.' 
      });
    } 
    
    if(token && token.split(' ')[0] === 'Bearer'){
      jwt.verify(token.split(' ')[1], process.env.APP_SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ 
        auth: false, 
        message: 'Failed to authenticate token.' 
      });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      console.log(req.userId)
      })
    }

    
    const { email } = req.body

    if (await User.findOne({ email })){
      return res.status(400).json({ 
        error: 'User already exists.'
      })
    }

    const user = new User({
      name: req.body.name,
      schoolRecord: req.body.schoolRecord,
      level: req.body.level,
      email: req.body.email,
      password: req.body.password,
    })

    const final = user.save(function (err, result) {
      return res.json(err || result)
    })

  }

  async update (req, res) {
    if (User.verifyLevel(user.level) == 'Administrador') {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true
      })

      return res.status(200).json({ 
        message: 'User updated succesfully.'
      })
    }
  }

  async destroy (req, res) {
    await User.findByIdAndDelete(req.params.id)

    return res.status(200).json({ 
      message: 'User deleted succesfully.'
    })
  }
}

module.exports = new UserController()