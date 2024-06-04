const express = require('express');
const router = express.Router();
const proyectosController = require('../controllers/proyectosController');
const { authenticate } = require('../middlewares/authMiddleware');

// Ruta para obtener todos los proyectos del usuario autenticado
router.get('/', async (req, res) => {
    const userId = req.user.id;
    console.log('userId = ', userId);

    const proyectos = await proyectosController.obtenerMisProyectos(userId);
    console.log('proyectos = ', proyectos);
    res.render('proyectos', { proyectos: proyectos || [] });
});

// Ruta para obtener un proyecto específico por su ID y sus tareas
router.get('/:id', async (req, res) => {
    const proyectoId = req.params.id;
    const userId = req.user.id;
    console.log('id = ', userId);
    console.log('proyecto = ', proyectoId);

    const proyecto = await proyectosController.obtenerProyectoPorId(userId);
    const tareas = await proyectosController.obtenerTareas(proyectoId);
    console.log("tareas = ", tareas);
    res.render('proyectoContent', { proyecto, tareas: tareas || [] });
});

// Ruta para obtener el formulario de edición de un proyecto
router.get('/editar/:id', async (req, res) => {
    const proyectoId = req.params.id;
    const proyecto = await proyectosController.obtenerProyectoPorId(proyectoId);
    res.render('editarProyecto', { proyecto });
});

// Ruta para manejar la edición de un proyecto
router.post('/editar/:id', async (req, res) => {
    const proyectoId = req.params.id;
    const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;
    console.log('nombre, descripcion, fecha_inicio, fecha_fin = ', nombre, descripcion, fecha_inicio, fecha_fin);
    resultado = await proyectosController.editarProyecto(proyectoId, { nombre, descripcion, fecha_inicio, fecha_fin });
    console.log('resultado = ', resultado);
    res.redirect(`/proyectos/${proyectoId}`);
});

router.post('/:proyectoId/tareas', async (req, res) => {
    const proyectoId = req.params.proyectoId;
    console.log('req.params.proyectoId = ', req.params.proyectoId); 
    const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;
    await proyectosController.crearTarea(proyectoId, { nombre, descripcion, fecha_inicio, fecha_fin });
    res.redirect(`/proyectos/${proyectoId}`);
});


router.post('/:proyectoId/hitos', async (req, res) => {
    const proyectoId = req.params.proyectoId;
    const { titulo, descripcion, fecha_limite } = req.body;
    await proyectosController.crearHito(proyectoId, { titulo, descripcion, fecha_limite });
    res.redirect(`/proyectos/${proyectoId}`);
});

module.exports = router;
