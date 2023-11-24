const Actividad = require('../models/actividad.model.js');
const Localizacion = require('../models/localizacion.model.js');

async function getAllActividades(req, res) {
  try {
    const actividades = await Actividad.findAll();
    return res.status(200).json(actividades);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function getOneActividad(req, res) {
  try {
    const actividad = await Actividad.findByPk(req.params.id);
    if (!actividad) {
      res.status(500).send('Actividad no encontrada');
    }
    return res.status(200).json(actividad);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createActividad(req, res) {
  try {
    const actividad = await Actividad.create(req.body);
    return res.status(200).send("Actividad añadida");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function createActividadyLoc(req, res) {
  const act = {
    checkAdmindad: req.body.nombre_actividad,
    dificultad: req.body.dificultad,
    distancia: req.body.distancia,
    tiempo_estimado: req.body.tiempo_estimado,
    servicios_disponibles: req.body.servicios_disponibles,
    profundiad_maxima: req.body.profundiad_maxima,
  };
  const loc = {
    municipio: req.body.municipio,
    latitud: req.body.latitud,
    longitud: req.body.longitud,
  };
  try {
    const actividad = await Actividad.create(act);
    const Localizacion = await Localizacion.create(loc);
    await actividad.setLocalizacion(localizacion);
    return res
      .status(200)
      .send('actividad creada: ', { actividad, localizacion });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function updateActividad(req, res) {
  try {
    const actividad = await Actividad.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).send("Actividad modificada");
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function setLocalizacion(req, res) {
  try {
    const actividad = await Actividad.findByPk(req.body.actividadId);
    
    await actividad.addLocalizacion(req.body.localizacionId);
    res.status(200).json(actividad);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteActividad(req, res) {
  try {
    const actividad = await Actividad.findByPk(req.params.id);

    if (!actividad) {
      return res.status(404).send('Actividad no encontrada');
    }

    await Actividad.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).send('Actividad eliminada');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}


module.exports = {
  getAllActividades,
  getOneActividad,
  createActividad,
  updateActividad,
  deleteActividad,
  setLocalizacion,
};
