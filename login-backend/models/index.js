const { Sequelize } = require('sequelize');

/*** Invocamos los modelos definidos ***/
/* 
  UsuarioModelo: es un nombre que le damos
  ./nombre del archivo del modelo -> ./usuarios 
  */
const UsuarioModelo = require('./usuarios')


// Option 2: Passing parameters separately (other dialects)
//                              'database', 'username, 'password',
const sequelize = new Sequelize('0hmNWvRLPc', '0hmNWvRLPc', 'MzW5kiwbZA', {
    host: 'remotemysql.com',
    dialect: 'mysql', 
    port: 3306
  });

/* Definimos una instancia del modelo enviándole 2 parámetros:
    1. Una instancia de sequelize (conexión a la base de datos)
    2. El tipo de instancia que va ha ser de tipo sequelize
    3. Le asignamos la instancia a una constante para que pueda ser usada 
*/
 const Usuario = UsuarioModelo(sequelize, Sequelize)

  sequelize.sync({ force: false })
  .then(()=>{
      console.log('Tablas sincronizadas');
  })

  //Exportamos la constante Usuario
  module.exports = {
      Usuario

  }