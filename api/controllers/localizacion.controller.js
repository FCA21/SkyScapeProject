const Localizacion = require("../models/localizacion.model.js");
const Actividad = require("../models/actividad.model.js");

async function getAllLocalizaciones(req, res) {
  try {
    const localizaciones = await Localizacion.findAll();
    return res.status(200).json(localizaciones);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getLocalizacionById(req, res) {
  try {
    const localizacion = await Localizacion.findByPk(req.params.id);
    if (!localizacion) {
      res.status(404).send("Localizacion no encontrada");
    }
    return res.status(200).json(localizacion);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


async function createLocalizacion(req, res) {
  try {
    const localizacion = await Localizacion.create(req.body);
    return res.status(200).send(localizacion);
  } catch (error) {
    res.status(500).send(error.message);
  }
}


async function updateLocalizacion(req, res) {
  try {
    const localizacion = await Localizacion.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json(localizacion);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteLocalizacion(req, res) {
  try {
    const localizacion = await Localizacion.destroy({
      where: {
        id: req.params.id,
      },
    });
    res
      .status(500)
      .json({ text: "Localizacion borrada", localizacion: localizacion });
  } catch (error) {}
}

module.exports = {
    getAllLocalizaciones,
    getLocalizacionById,
    createLocalizacion,
    updateLocalizacion,
    deleteLocalizacion
}
