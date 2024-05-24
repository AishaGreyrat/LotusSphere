const express = require('express');
const app = express();
const path = require('path');
const authMiddleWare = require('./middlewares/authMiddleware');

const router = require('./routes/routes');

// Configuración de la plantilla Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());

app.use('/', router);


// Puerto en el que escucha el servidor
const port = 4444;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});