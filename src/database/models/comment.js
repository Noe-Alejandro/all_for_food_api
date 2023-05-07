const { DataTypes } = require('sequelize');
const User = require('../models/user');
const sequelize = require('../db');

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