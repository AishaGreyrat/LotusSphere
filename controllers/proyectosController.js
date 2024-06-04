const proyectoModel = require('../models/proyectModel');

async function obtenerMisProyectos(userId) {
    try {
        const proyectos = await proyectoModel.obtenerMisProyectos(userId);
        return proyectos;
    } catch (error) {
        console.error('Error al obtener proyectos:', error.message);
        throw error;
    }
}

async function obtenerProyectoPorId(proyectoId) {
    try {
        const proyecto = await proyectoModel.obtenerProyectoPorId(proyectoId);
        return proyecto;
    } catch (error) {
        console.error('Error al obtener el proyecto por ID:', error.message);
        throw error;
    }
}

async function obtenerTareas(proyectoId) {
    try {
        const tareas = await proyectoModel.obtenerTareas(proyectoId);
        return tareas;
    } catch (error) {
        console.error('Error al obtener tareas:', error.message);
        throw error;
    }
}

async function editarProyecto(proyectoId, data) {
    try {
        await proyectoModel.editarProyecto(proyectoId, data);
    } catch (error) {
        console.error('Error al editar el proyecto:', error.message);
        throw error;
    }
}

async function crearTarea(proyectoId, data) {
    try {
        await proyectoModel.crearTarea(proyectoId, data);
    } catch (error) {
        console.error('Error al crear tarea:', error.message);
        throw error;
    }
}

async function crearHito(proyectoId, data) {
    try {
        await proyectoModel.crearHito(proyectoId, data);
    } catch (error) {
        console.error('Error al crear hito:', error.message);
        throw error;
    }
}

module.exports = {
    obtenerMisProyectos,
    obtenerProyectoPorId,
    obtenerTareas,
    editarProyecto,
    crearTarea,
    crearHito
};
