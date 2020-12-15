/* Llamamos al modelo que se encuentra en la carpeta models
   referenciado en el archivo index.js, si se coloca un nombre diferente
   a index.js se debe colocar en la ruta, ejemplo, en vez de index se llama usuario.js: 
   const usuario = require('../../models/usuario.js');
*/   
const { Usuario } = require('../models');

/* instalamos la librería bcrypt desde la terminal y definimos una instancia
   para la encriptación de passwords.
   Desde la terminal corremos: npm i bcryptjs
*/
const bcrypt = require('bcrypt');


/* npm i jsonwebtoken : para instalar la librería para el manejo de los tokens 
   y creamos una instancia jwt de jsonwebtoken 
*/
var jwt = require('jsonwebtoken');

const { restart } = require('nodemon');

exports.login = async(req, res, next) => {
    try {
        /* user es el registro que viene de la consulta de la BD si lo encuentra
           y en body llega todos los datos enviados en el formulario del frontend
        */
        const user = await Usuario.findOne({where: {email: req.body.email} });
        if (user) {
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (passwordIsValid) {
              
                const token = jwt.sign({
                    id: user.id,
                    nombre: user.nombre,
                    rol: user.rol,
                    email: user.email
                },'SuperChain*_toPSecret_**_',{
                    /* tiempo de expiración del token en segundos */
                    expiresIn: 86400 
                });

                res.status(200).send({
                           /* tokenReturn viene del frontend */
                    auth: true, 
                    tokenReturn: token,
                    user //user ==> Si se comenta no muestra todos los datos del usuario
                })

            } else {
                /* status 401 se envía cuando hay un error en alguno de los parámetros enviados desde el frontend*/
                res.status(401).json({
                    error: '!!Error!! en la autenticación'
                })
            }
        } else {
            /* status 404 se envía cuando no encuentra el registro*/
            res.status(404).json({
                error: '!!Error!!, usuario inválido'
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message: '!!Error de servidor!!'
        })
      next(error);  
    }
};

/* 
   Corresponde a: /api/usuario/listar  ==> Lista todos los usuarios
   http://localhost:3000/api/usuario/listar : En postman
*/
exports.listar = async(req, res, next) => {
    try {
        const users = await Usuario.findAll();
        if (users) {
            res.status(200).json(users);   
        } else {
            /* status 404 se envía cuando no encuentra el registro*/
            res.status(404).json({
                error: 'No existen usuarios registrados'
            })
        }
    } catch (error) {

      next(error);  
    }
};

/* 
   corresponde a: /api/usuario/register ==> Crea usuarios 
   http://localhost:3000/api/usuario/register : En postman 
*/
exports.register = async(req, res, next) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password,10);
        const user = await Usuario.create(req.body);
        res.status(200).json(user);   
    } catch (error) {

      next(error);  
    }
};

/* 
   corresponde a: /api/usuario/actualizar/1 ==> Actualiza el campo nombnre de usuarios 
   http://localhost:3000/api/usuario/actializar/1 : En postman 

exports.actualizar = async(req, res, next) => {
try {
        const user = await Usuario.findOne();
        const id=req.body.id;
        const Usuario =await Usuario.update({
        nombre: req.body.name
    },
    {where: {id: req.body.id} });
    if(!Usuario){
        return res.status(404).send({
        status: 404,
        message: 'No data found'
    });
    }
    res.status(200).send({
        status: 200,
        message: 'Data Update Successfully'
    });
  }catch (error) {
    console.log(error)
    return res.status(400).send({
    message:'Unable to update data',
    errors: error,
    status: 400
    })
 }
}

*/

exports.actualizar = async(req, res, next) =>  {

  try {
    Usuario.findByIdAndUpdate(req.params.id,{name:req.body.nombre}, function(err, usuarioInfo){
        if(err)
            next(err);
           else {
            res.json({status:"success", message: "Usuario actualizado éxitosamente!!!", data:null});
           }
          });    
  } catch (error) {
      
  }
}