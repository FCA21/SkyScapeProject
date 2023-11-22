const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model.js');

function checkAuth(req, res, next) {
  if (!req.headers.authorization)
    return res.status(404).send('Token no encontrado');
  console.log(req.headers.authorization);
  jwt.verify(
    req.headers.authorization,
    process.env.SECRET,
    async (err, result) => {
      if (err) return res.status(401).send('Token no válido');

      const usuario = await Usuario.findOne({ where: { email: result.email } });
      if (!usuario) return res.status(404).send('Usuario no encontrado');

      res.locals.usuario = usuario;

      next();
    }
  );
}

function checkAdmin(req, res, next) {
  if (res.locals.usuario.rol === 'admin') {
    next();
  } else {
    return res.status(404).send('No podrás pasar');
  }
}


module.exports = {
    checkAdmin,
    checkAuth
}