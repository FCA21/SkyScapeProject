const {
  getAllActividades,
  getOneActividad,
  createActividad,
  updateActividad,
  deleteActividad,
  setLocalizacion,
} = require('../controllers/actividad.controller');
const { checkAuth, checkAdmin } = require('../middleware/index');

const router = require('express').Router();


router.get('/', getAllActividades);
router.get('/:id', checkAuth, getOneActividad);
router.post('/', checkAuth, checkAdmin, createActividad);
router.put('/localizacion', checkAuth, checkAdmin, setLocalizacion);
router.put('/:id', checkAuth, checkAdmin, updateActividad);
router.delete('/:id', checkAuth, checkAdmin, deleteActividad);

module.exports = router;
