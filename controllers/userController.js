const userModel = require('../models/userModel');
const authMiddleWare = require('../middlewares/authMiddleware');

// Función asincrónica para registrar un usuario
async function registrarUsuario(nombre, usuario, email, password_hash) {

        // Se encriptan el nombre, email y hash de la contraseña de forma paralela
        let [nombreSeguro, usuarioSeguro, emailSeguro, passwordHashSeguro] = await Promise.all([
            authMiddleWare.encryptData(nombre),
            authMiddleWare.encryptData(usuario),
            authMiddleWare.encryptData(email),
            authMiddleWare.encryptData(password_hash)
        ]);
    
        console.log('nombreSeguro = ', nombreSeguro, 'usuarioSeguro = ', usuarioSeguro, ' emailSeguro = ', emailSeguro, ' PasswordHashSeguro = ', passwordHashSeguro);
        
        const Usuario = {
            nombre: nombreSeguro,
            usuario: usuarioSeguro,
            email: emailSeguro,
            password: passwordHashSeguro
        }
        return await userModel.registrarUsuario(Usuario);
    
}



// Función asincrónica para logear a un usuario
async function logearUsuario(usuario) {
    console.log('logearUsuario objeto usuario = ', usuario);
    console.log('logearUsuario email = ', usuario.email);
    console.log('logearUsuario password = ', usuario.password);

    // Se encriptan el nombre y la contraseña de forma paralela
    let [emailSeguro, passwordSeguro] = await Promise.all([
        authMiddleWare.encryptData(usuario.email),
        authMiddleWare.encryptData(usuario.password)
    ]);

    console.log(' encriptaciones = '. emailSeguro, passwordSeguro);
    
    const Usuario = {
        email: emailSeguro,
        password: passwordSeguro
    }
    // Se intenta logear al usuario en la aplicación
    return await userModel.logearUsuario(Usuario);
}



module.exports = {
    registrarUsuario,
    logearUsuario,
};