const { DataTypes } = require('sequelize');
const sequelize = require('../db');

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