const express = require('express');
const router = express.Router();

const index = require('./index');
const login = require('./login');
const register = require('./register');
const registrarUsuario = require('./registrar-usuario');
const logout = require('./logout');
const profile = require('./profile');
const proyectos = require('./proyectos');
const proyectoContent = require('./proyectoContent');
const section = require('./section');
const tareas = require('./tareas');

router.use('/', index);
router.use('/register', register);
router.use('/registrar-usuario', registrarUsuario);
router.use('/login', login);
router.use('/logout', logout);
router.use('/profile', profile);
router.use('/proyectos', proyectos);
router.use('/proyectoContent', proyectoContent);
router.use('/section', section);
router.use('/tareas', tareas);

module.exports = router;