const { DataTypes } = require('sequelize');
const sequelize = require('../db');

/**
 * Score: Modelo que representa la entidad de la base de datos para las calificaciones de una receta
 *
 * @property { INTEGER } id : el número identificador de la tupla
 * @property { INTEGER } userId : el id del usuario calificador
 * @property { INTEGER } recipeId : el id de la receta a calificar
 * @property { INTEGER } score : la calificación que un usuario asigna a la receta
 */
const Score = sequelize.define("scores",
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
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
    sequelize,
    modelName: "scores",
    tableName: "scores",
    timestamps: false
});

module.exports = Score;