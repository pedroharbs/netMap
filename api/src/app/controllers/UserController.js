const User = require('../models/User')

class UserController {

  async index (req, res) {
    //Realiza paginação da resposta
    const users = await User.paginate({}, {
      page: req.query.page || 1,
      limit: 20,
      sort: '-createdAt'
    })

    return res.json(users)
  }

  async store (req, res) {
    if (req.userId != undefined && req.userId != '' && req.userLevel == 'Administrador') {

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

      user.save(function (err, result) {
        return res.json(err || result)
      })
    }
  }

  async update (req, res) {
    if (req.userId != undefined && req.userId != '' && req.userLevel == 'Administrador') {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true
      })

      return res.status(200).json({ 
        message: 'User updated succesfully.'
      })
    }
  }

  async destroy (req, res) {
    if (req.userId != undefined && req.userId != '' && req.userLevel == 'Administrador') {
      await User.findByIdAndDelete(req.params.id)

      return res.status(200).json({ 
        message: 'User deleted succesfully.'
      })
    }
  }
}

module.exports = new UserController()