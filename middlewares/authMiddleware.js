const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const fs = require('fs');
const privateKey = fs.readFileSync('./config/jwtRS256.key');

async function authenticate(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, privateKey);
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/login');
    }
}

// Función para generar un token JWT
function generateToken(data, expirationTime) {
    // Se firma el token utilizando el algoritmo RS256 y la clave privada RSA del entorno
    console.log('privateKey', privateKey);
    return jwt.sign({ data }, privateKey, { algorithm: 'RS256', expiresIn: expirationTime });
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

// Función asincrónica para obtener el hash de una contraseña
async function getHash(passwordString) {
    console.log('Funcion de getHash recibiendo la contraseña = ', passwordString);
    // Se obtiene el número de rondas de sal para el hash de contraseñas desde el entorno y se convierte a entero
    const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS);
    // Se genera el hash de la contraseña usando bcrypt y el número de rondas de sal
    const password_hash = await bcrypt.hash(passwordString, saltRounds);
    // Se devuelve el hash generado
    console.log('numero de saltos que hace = ', saltRounds + 'Contraseña Hasheada por devolver = ', password_hash);

    return password_hash;
}

function addUserToLocals(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('isAuthenticated', req.isAuthenticated);
      res.locals.user = req.user;
    } else {
      res.locals.user = null;
    }
    next();
  }


module.exports = {
    authenticate,
    encryptData,
    generateToken,
    getHash,
    addUserToLocals
};