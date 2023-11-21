const router = require('express').Router();

//importamos rutas
const usuarioRouter = require('./usuario.router');
const actividadRouter = require('./actividad.router');
const localizacionRouter = require('./localizacion.router');
const authRouter = require('./auth.router');

//definimos rutas
router.use('/usuario', usuarioRouter);
router.use('/actividad', actividadRouter);
router.use('/localizacion', localizacionRouter);
router.use('/auth', authRouter);

//exportamos modulo
module.exports = router;
