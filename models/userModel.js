const axios = require('axios');

class Usuario {
    constructor(id, nombre, usuario, email, contraseña) {
        this.id = id;
        this.nombre = nombre;
        this.usuario = usuario;
        this.email = email;
        this.contraseña = contraseña;
    }
}

async function registrarUsuario(dataSegura) {
    try {
        console.log('objeto usuarios siendo recibida por el modelo = ',dataSegura);
        
        await axios.post(`${process.env.BASE_URL}/usuarios/registrar`, { dataSegura });
        console.log('se pudo registrar el usuario', dataSegura);
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
    }
}

async function logearUsuario(dataSegura) {
    try {
        console.log('se logea el usuario');                                  
        const response = await axios.post(`${process.env.BASE_URL}/usuarios/login`, {dataSegura});
        const usuario = response.data;
        console.log('new Usuario = ', usuario);
        return new Usuario(usuario.id, usuario.nombre, usuario.usuario, usuario.email, usuario.contraseña);
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error.message);
    }
}


module.exports = {
    registrarUsuario,
    logearUsuario,
    Usuario
};
