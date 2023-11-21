const Actividad = require('../models/actividad.model');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');

async function getAllUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll({
      where: req.query,
    });
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(402).send(error.message);
  }
}

async function getOneUsuario(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      res.status(500).send('Usuario no encontrado');
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(402).send(error.message);
  }
}

async function getPerfil(req, res) {
  try {
    const usuario = await Usuario.findByPk(res.locals.usuario.id, {
      include: Actividad,
    });
    if (!usuario) {
      res.status(500).send('Usuario no encontrado');
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(402).send(error.message);
  }
}

async function createUsuario(req, res) {
  const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS));
  const hashedClave = bcrypt.hashSync(req.body.clave, saltRounds);
  req.body.clave = hashedClave;
  try {
    const usuario = await Usuario.create(req.body);
    return res.status(200).send('Usuario creado');
  } catch (error) {
    return res.status(402).send(error.message);
  }
}

async function updateUsuario(req, res) {
  try {
    const usuario = await Usuario.update(req.body, {
      where: { id: req.params.id },
    });
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(402).send(error.message);
  }
}

async function setActividad(req, res) {
  try {
    const actividad = await Actividad.findByPk(req.body.actividadId);
    const usuario = await Usuario.findByPk(req.body.usuarioId, {
      include: Actividad,
    });

    const actividadesPendientes = usuario.actividad.filter(function(act) {
      return act.estado ==='pendiente'
    })
    if (actividadesPendientes.length >= 4) {
      return res.status(501).send('Tienes muchas actividades pendientes');
    }
    await actividad.setUsuario(usuario);
    return res.status(200).send('Actividad añadida');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function setFavorito(req, res) {
  try {
    const usuario = await Usuario.findByPk(usuarioId);
    const actividad = await Actividad.findByPk(actividadId);
    await usuario.addUserFav(actividad);
    return res.status(200).send('Actividad añadida a favoritos');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function removeFavorito(req, res) {
  try {
    const usuario = await Usuario.findByPk(usuarioId);
    const actividad = await Actividad.findByPk(actividadId);
    await usuario.removeUserFav(actividad);
    return res.status(200).send('Actividad eliminada a favoritos');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}


async function setRate(req, res) {
  try {
    const usuario = await Usuario.findByPk(usuarioId);
    const actividad = await Actividad.findByPk(actividadId);
    await usuario.addUserRate(actividad);
    return res.status(200).send('Rate añadido a la actividad');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteUsuario(req, res) {
  try {
    const usuario = await Usuario.destroy({
      where: { id: req.params.id },
    });
    return res
      .status(200)
      .json({ text: 'Usuario eliminado', usuario: usuario });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllUsuarios,
  getOneUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getPerfil,
  setActividad,
  setFavorito,
  setRate,
  removeFavorito
};
