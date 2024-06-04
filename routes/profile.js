const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // El usuario no ha iniciado sesión, redirige al inicio de sesión
    res.render('profile', { title: req.user = `Bienvenido ${req.user.nombre}`});
});

module.exports = router;