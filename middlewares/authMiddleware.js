const jwt = require('jsonwebtoken');
const crypto = require('crypto');

async function authenticate(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const token = req.cookies.token;

    // Si no hay token, redirige al usuario al login
    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Verifica el token usando la clave privada RSA del entorno
        const decoded = jwt.verify(token, process.env.RSA_PRIVATE_KEY);

        // Almacena el ID del usuario en la solicitud para su posterior uso
        req.userId = decoded.userId;

        next();

    } catch (err) {
        // Si hay un error en la verificación del token, redirige al usuario al login
        return res.redirect('/login');
    }
}

// Función para encriptar datos
function encryptData(text) {
    // Se obtiene la clave privada AES del entorno y se convierte en un buffer
    const key = Buffer.from(process.env.AES_PRIVATE_KEY, 'hex');
    // Se obtiene el IV del entorno y se convierte en un buffer
    const iv = Buffer.from(process.env.AES_IV, 'hex');
    // Se crea un cifrador usando el algoritmo AES-256-GCM, la clave y el IV
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    // Se encripta el texto en formato UTF-8 y se convierte a hexadecimal
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Se devuelve el IV, la AuthTag y el texto encriptado, separados por ':'
    return iv.toString('hex') + ':' + cipher.getAuthTag().toString('hex') + ':' + encrypted;
}


module.exports = {
    authenticate,
    encryptData,
};