const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * Ingredient : Modelo que representa la entidad de la base de datos para los ingredientes
 * @property {INTEGER} id : el identificador del ingrediente 
 * @property {string} name : el nombre del ingrediente 
 */
const Ingredient = sequelize.define("ingredient",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "ingredient",
    tableName: "ingredient",
    timestamps: false
});


module.exports = Ingredient;