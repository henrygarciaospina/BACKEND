module.exports = (sequelize, type) => {

    return sequelize.define('usuario', {
        // Model attributes are defined here
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true

        },
           // allowNull defaults to true
        nombre: type.STRING,
        email: type.STRING,
        password: type.STRING,
        rol: type.STRING
      });
}