/* Definimos el route de Express en index.js de la carpera routes */
const router = require('express').Router();

/* Dentro de /routes/api/usuario.js está la definición de la ruta
   para la constante apiUsuarioRouter
*/   
const apiUsuarioRouter = require('./api/usuarios');

/* No se necesita /api porque la petición ya viene desde el index.js a
  que esta a  nivel del proyecto principal.
*/  
router.use('/usuario', apiUsuarioRouter);

/* Lo exportamos para poder utilizarlo*/
module.exports = router;

/* Las rutas se van a definir de la siguinete manera: 

    /api/usuario
    /api/usuario/login
    /api/usuario/registrar

    /api/articulo
    /api/articulo/registrar
*/


