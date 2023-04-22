const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comment = sequelize.define("comment",
    {
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING,
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

Comment.removeAttribute('id');

module.exports = Comment;