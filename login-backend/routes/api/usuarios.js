/* Definimos el route de Express en index.js de la carpera routes */
const router = require('express').Router();

//Permite tener acceso a los métodos definidos en el controlador UsuarioController
const usuarioController = require('../../controllers/UsuarioController');

module.exports = router;

router.get('/listar', usuarioController.listar);
router.post('/login', usuarioController.login);
router.post('/register', usuarioController.register);
router.put('/actualizar/:usuarioId', usuarioController.actualizar);