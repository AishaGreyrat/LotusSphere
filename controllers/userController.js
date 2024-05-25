const userModel = require('../models/userModel');
const authMiddleWare = require('../middlewares/authMiddleware');

// Función asincrónica para registrar un usuario
async function registrarUsuario(nombre, email, password_hash) {
    console.log(nombre, email, password_hash);
    // Se encriptan el nombre, email y hash de la contraseña de forma paralela
    let [nombreSeguro, emailSeguro, passwordHashSeguro] = await Promise.all([
        authMiddleWare.encryptData(nombre),
        authMiddleWare.encryptData(email),
        authMiddleWare.encryptData(password_hash)
    ]);

    console.log('nombreSeguro = ', nombreSeguro, ' emailSeguro = ', emailSeguro, ' PasswordHashSeguro = ', passwordHashSeguro);
   
    // Crear un objeto con los datos del usuario
    const usuario = {
        nombre: nombreSeguro,
        email: emailSeguro,
        passwordHash: passwordHashSeguro
};


    // Se registra al usuario en la base de datos
    return await userModel.registrarUsuario(usuario);
}

// Función asincrónica para logear a un usuario
async function logearUsuario(nombre, password) {
    // Se encriptan el nombre y la contraseña de forma paralela
    let [nombreSeguro, passwordSeguro] = await Promise.all([
        authMiddleWare.encryptData(nombre),
        authMiddleWare.encryptData(password)
    ]);

    // Se intenta logear al usuario en la aplicación
    return await userModel.logearUsuario(`${nombreSeguro},${passwordSeguro}`);
}




module.exports = {
    registrarUsuario,
    logearUsuario,
};