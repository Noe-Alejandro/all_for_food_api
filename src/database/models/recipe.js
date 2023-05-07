const { DataTypes } = require('sequelize');
const User = require('../models/user');
const sequelize = require('../db');

const Recipe = sequelize.define("recipe",
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
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: "https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png"
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        steps: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rate: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0.0
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: '000-00-00'
        },
        modifiedAt: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: '000-00-00'
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    }, {
    sequelize,
    modelName: "recipe",
    tableName: "recipe",
    timestamps: false
});

Recipe.belongsTo(User);

module.exports = Recipe;