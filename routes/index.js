const express = require('express');
const router = express.Router();

// Rutas públicas
router.get('/', (req, res) => {
    // El usuario no ha iniciado sesión, redirige al inicio de sesión
    res.render('index', { title: req.user != null ? `Bienvenido ${req.user.nombre}` : 'Bienvenido EnigmaText', user: req.user != null ? `${req.user.nombre}` : ''});

});


module.exports = router;