const { DataTypes } = require('sequelize');
const User = require('../models/user');
const sequelize = require('../db');

/**
 * Comment : Modelo que representa la entidad de la base de datos para los comentarios
 * @property {INTEGER} id : el identificador del comentario 
 * @property {INTEGER} recipeId : el identificador de la receta
 * @property {INTEGER} userId : el identificador del usuario
 * @property {string} comment : la cadena de texto del comentario
 * @property {DATE} createdAt : la fecha en la que se creó el comentario
 * @property {DATE} modifiedAt : la fecha en la que se modificó el comentario
 * Belongs to : User
 */
const Comment = sequelize.define("comment",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        modifiedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "comment",
    tableName: "comment",
    timestamps: false
});

Comment.belongsTo(User);

module.exports = Comment;