const express = require('express');
const router = express.Router();
const axios = require('axios'); // Para hacer solicitudes HTTP
const passport = require('passport');

// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
  res.render('login', { title: 'Iniciar sesión', user: req.user != null ? `${req.user.nombre}` : '' });
});

// Ruta para manejar el inicio de sesión
router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), async (req, res) => {
  try {
    // Si se autentica correctamente, realiza una solicitud a tu API para generar un token JWT
    const response = await axios.post(`${process.env.BASE_URL}/usuarios/registrar`, { userId: req.user.id });

    // Extrae el token JWT de la respuesta de la API
    const token = response.data.token;

    // Establece la cookie con el token JWT
    res.cookie('token', token, { httpOnly: true, secure: false });

    // Redirige al usuario a la página del carrito u otra página deseada
    res.redirect('/');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;