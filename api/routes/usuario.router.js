const {
  getAllUsuarios,
  getPerfil,
  getOneUsuario,
  createUsuario,
  setActividad,
  setFavorito,
  setRate,
  removeFavorito,
  updateUsuario,
  deleteUsuario,
} = require('../controllers/usuario.controller');
const { checkAuth, checkAdmin } = require('../middleware');

const router = require('express').Router();

//definimos CRUD basico de user
router.get('/', checkAuth, checkAdmin, getAllUsuarios);
router.get('/getPerfil', checkAuth, getPerfil);
router.get('/:id', checkAuth, checkAdmin, getOneUsuario);
router.post('/', checkAuth, checkAdmin, createUsuario);
router.post('/actividad', checkAuth, setActividad);
router.put('/rate', checkAuth, setRate);
router.put('/favorito', checkAuth, setFavorito);
router.delete('/favorito', checkAuth,removeFavorito)
router.put('/:id', checkAuth, checkAdmin, updateUsuario);
router.delete('/:id', checkAuth, checkAdmin, deleteUsuario);


module.exports = router;
