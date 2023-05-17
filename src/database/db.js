const { Sequelize } =  require('sequelize'); 
const { database } = require('../configs/config');

/**
 * Configuración de la conexión a la DB por medio de Sequelize
 */
const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: "mysql"
    }
);

module.exports = sequelize;