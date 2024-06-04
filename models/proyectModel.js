const axios = require('axios');

class Proyecto {
    constructor(id, nombre, descripcion, fecha_inicio, fecha_fin, usuario_id) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecha_inicio = fecha_inicio;
        this.fecha_fin = fecha_fin;
        this.usuario_id = usuario_id;
    }
}

class Tarea {
    constructor(id, nombre, descripcion, fecha_limite, estado, proyecto_id) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fecha_limite = fecha_limite;
        this.estado = estado;
        this.proyecto_id = proyecto_id;
    }
}

async function crearNuevoProyecto(newProyect) {
    try {
        await axios.post(`${process.env.BASE_URL}/proyectos/createNew`, newProyect);
        console.log('Se creo el Proyecto Correctamente');
    } catch (error) {
        console.error('Error al crear proyecto:', error.message);
    }
}

async function obtenerMisProyectos(usuarioId) {
    try {
        console.log('usuarioId en mi modelos = ', usuarioId);
        const response = await axios.get(`${process.env.BASE_URL}/proyectos/getAll`, { params: { userId: usuarioId } });

        // Asegúrate de que response.data sea un array
        if (Array.isArray(response.data)) {
            const proyectos = response.data.map(proyecto => new Proyecto(
                proyecto.id,
                proyecto.nombre,
                proyecto.descripcion,
                proyecto.fecha_inicio,
                proyecto.fecha_fin,
                proyecto.usuario_id
            ));
            return proyectos;
        } else {
            console.error('La respuesta no es un array:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error al obtener proyectos:', error.message);
        return [];
    }
}

async function eliminarProyecto(proyectoId) {
    return await axios.delete(`${process.env.BASE_URL}/proyectos/deleteProyecto/${proyectoId}`);
}

async function obtenerProyectoPorId(proyectoId) {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/proyectos/obtenerProyectoId/${proyectoId}`);
        const proyecto = response.data;
        console.log('proyecto pruebaaaaa= ', proyecto);
        return new Proyecto(
            proyecto.id,
            proyecto.nombre,
            proyecto.descripcion,
            proyecto.fecha_inicio,
            proyecto.fecha_fin,
            proyecto.usuario_id
        );
    } catch (error) {
        console.error('Error al obtener el proyecto por ID:', error.message);
        throw error;
    }
}

async function obtenerTareasPorProyectoId(proyectoId) {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/proyectos/obtenerTareasPorProyectoId`, { params: { proyectoId } });
        console.log('response = ', response);
        if (Array.isArray(response.data)) {
            return response.data.map(tarea => new Tarea(
                tarea.id,
                tarea.nombre,
                tarea.descripcion,
                tarea.fecha_limite,
                tarea.estado,
                tarea.proyecto_id
            ));
            
        } else {
            console.error('La respuesta no es un array:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error al obtener tareas por proyecto ID:', error.message);
        return [];
    }
}

async function crearTarea(proyectoId, tarea) {
    try {
        console.log("se mando la tarea para crear");
        await axios.post(`${process.env.BASE_URL}/tareas/create`, { proyectoId, ...tarea });
    } catch (error) {
        console.error('Error al crear tarea:', error.message);
        throw error;
    }
}

async function crearHito(proyectoId, hito) {
    try {
        await axios.post(`${process.env.BASE_URL}/hitos/create`, { proyectoId, ...hito });
    } catch (error) {
        console.error('Error al crear hito:', error.message);
        throw error;
    }
}

async function obtenerTareas(proyectoId) {
    try {
        console.log('proyectoId de obtener tareas = ', proyectoId);
        const response = await axios.get(`${process.env.BASE_URL}/tareas/getAll`, { params: { proyectoId } });
        return response.data;
    } catch (error) {
        console.error('Error al obtener tareas:', error.message);
        return [];
    }
}


module.exports = {
    Proyecto,
    Tarea,
    crearNuevoProyecto,
    obtenerMisProyectos,
    obtenerTareasPorProyectoId,
    eliminarProyecto,
    obtenerProyectoPorId,
    crearTarea,
    crearHito,
    obtenerTareas
};