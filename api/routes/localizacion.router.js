const {
  getOneLocalizacion,
  getAllLocalizaciones,
  createLocalizacion,
  updateLocalizacion,
  deleteLocalizacion,
} = require('../controllers/localizacion.controller');
const {
  checkAuth,
  checkAdmin,
} = require('../middleware/index');

const router = require('express').Router(); 

router.get('/', checkAuth, getAllLocalizaciones);
router.get('/:id', checkAuth, getOneLocalizacion);
router.post('/', checkAuth, checkAdmin, createLocalizacion);
router.put('/:id', checkAuth, checkAdmin, updateLocalizacion);
router.delete('/:id', checkAuth, checkAdmin, deleteLocalizacion);

module.exports = router;
