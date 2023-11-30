const Actividad = require('../models/actividad.model');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const Usuario_actividad = require('../models/usuario_actividad.model');
const { and } = require('sequelize');
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
      include: [
        {
          model: Actividad,
          as: 'userFav',
        },
        {
          model: Actividad
        }
      ],
    });
    if (!usuario) {
      res.status(500).send('Usuario no encontrado');
    }
    const actividades = Actividad.findAll();
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(402).send(error.message);
  }
}

async function createUsuario(req, res) {
  const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS));
  const hashedPass = bcrypt.hashSync(req.body.password, saltRounds);
  req.body.password = hashedPass;
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
    return res.status(200).send('Usuario modificado');
  } catch (error) {
    return res.status(402).send(error.message);
  }
}

async function setActividad(req, res) {
  try {
    const usuario = await Usuario.findByPk(res.locals.usuario.id, {
      include: [Actividad]
    });
    const actividad = await Actividad.findByPk(req.body.actividadId);

    if (!actividad) {
      return res.status(404).send('La actividad no existe');
    }

    const actividadesPendientes = await Usuario_actividad.findAll({
      where: {
        usuarioId: res.locals.usuario.id,
        estado: false,
      },
    });

    if (actividadesPendientes.length >= 3) {
      return res.status(501).send('Tienes muchas actividades pendientes');
    }

     const actividadesUsuario = await usuario.getActividads({
       where: {
         id: actividad.id,
       },
     });
     if (actividadesUsuario.length > 0) {
       return res.status(400).send('Tienes esta actividad pendiente');
     }
    await usuario.addActividad(actividad);

    return res.status(200).send('Actividad añadida');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function marcarActividadRealizada(req, res) {
  try {
    const usuario = await Usuario.findByPk(res.locals.usuario.id);
    const actividad = await Actividad.findByPk(req.body.actividadId);
    if (!actividad) {
      return res.status(404).send('La actividad no existe');
    }

    const userActividad = await Usuario_actividad.findOne({
      where: {
        usuarioId: usuario.id,
        actividadId: actividad.id,
      },
    });

    userActividad.estado = true;
    await userActividad.save();

    return res.status(200).send('Actividad marcada como realizada');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function setFavorito(req, res) {
  try {
    const usuario = await Usuario.findByPk(res.locals.usuario.id);
    const actividad = await Actividad.findByPk(req.body.actividadId);
    await usuario.addUserFav(actividad);
    return res.status(200).send('Actividad añadida a favoritos');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function removeFavorito(req, res) {
  try {
    const usuario = await Usuario.findByPk(res.locals.usuario.id);
    const actividad = await Actividad.findByPk(req.body.actividadId);
    await usuario.removeUserFav(actividad);
    return res.status(200).send('Actividad eliminada de favoritos');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function setRate(req, res) {
  try {
    const usuario = await Usuario.findByPk(res.locals.usuario.id);
    const actividad = await Actividad.findByPk(req.body.actividadId);
    const userActividad = await Usuario_actividad.findOne({
      where: {
        usuarioId: usuario.id,
        actividadId: actividad.id,
      },
    });
    if (userActividad.estado == true) {
      await usuario.addUserRate(actividad, {
        through: { rating: req.body.rating },
      });
      return res.status(200).send('Rating añadido a la actividad');
    } else {
      return res
        .status(403)
        .send('No puedes valorar esta actividad hasta que no la realices');
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteUsuario(req, res) {
  try {
    const usuario = await Usuario.destroy({
      where: { id: req.params.id },
    });
    return res.status(200).json({ text: 'Usuario eliminado' });
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
  removeFavorito,
  marcarActividadRealizada,
};
