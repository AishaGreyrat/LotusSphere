const express = require('express');
const router = express.Router();

const index = require('./index');
const register = require('./register');
const registrarUsuario = require('./registrar-usuario');

router.use('/', index);
router.use('/register', register);
router.use('/registrar-usuario', registrarUsuario);

module.exports = router;