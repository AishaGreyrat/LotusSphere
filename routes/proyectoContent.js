const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');

router.get('/', async (req, res) => {
    const userId = req.user.id;
    console.log('userId = ', userId);

    const proyectos = await proyectosController.obtenerMisProyectos(userId);
    console.log('proyectos = ', proyectos);
    const tareas = await proyectosController.obtenerTareas(userId);
    console.log("tareas = ", tareas);
    res.render('proyectoContent', { proyectos: proyectos || [], tareas: tareas || [] });
});



module.exports = router;