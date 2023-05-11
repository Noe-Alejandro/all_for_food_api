const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const Recipe = require('./recipe');

/**
 * Favorite: Modelo que representa la entidad de la base de datos para las recetas favoritas de un usuario
 * 
 * @property { INTEGER } id : el identificador de la relación 
 * @property { INTEGER } recipeId : el identificador de la receta favorita
 * @property { INTEGER } userId : el identificador del usuario al que pertenece la lista
 * 
 * Belongs to: User, Recipe
 */
const Favorite = sequelize.define("favorites",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "favorites",
    tableName: "favorites",
    timestamps: false
});

Favorite.belongsTo(User);
Favorite.belongsTo(Recipe);

module.exports = Favorite;