const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  var authHeader = req.headers.authorization;
    
  if (!authHeader) {
    return res.status(401).send({ 
      auth: false, 
      message: 'No token provided.' 
    });
  } 

  // Splitando token
  const parts = authHeader.split(' ')

  if(!parts.lenght === 2){
    return res.status(401).send({
      auth: false,
      message: 'Token error.'
    })
  }

  // schema recebe a palavra Bearer, token recebe o jwt propriamente dito
  const [ scheme, token ] = parts

  // Verificando se tem a palavra bearer
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({
      auth: false,
      message: 'Token malformated.'
    })
  }
  
  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ 
        auth: false, 
        message: 'Token invalid.' 
      })
    } 

    req.userId = decoded.id
    req.userLevel = decoded.level

    next()
  })
}