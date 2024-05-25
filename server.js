const express = require('express');
const app = express();
const path = require('path');
const authMiddleWare = require('./middlewares/authMiddleware');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const router = require('./routes/routes');


//Configura Cookie Parser
app.use(cookieParser());

//Configura DotEnv
dotenv.config();

app.use(express.urlencoded({ extended: true }));


// Configuración de la plantilla Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());

/* 
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await usuarios.obtenerPorNombre(username);
      if (!user) {
        return done(null, false, { message: 'Usuario incorrecto.' });
      }
      const passwordMatch = await authMiddleware.comparePassword(password, user.contraseña);
      if (!passwordMatch) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await usuarios.obtenerPorId(id).then((user) => {
    done(null, user);
  }).catch((error) => {
    done(error, null);
  });
});
*/

app.use('/', router);

// Puerto en el que escucha el servidor 
const port = 4444;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});