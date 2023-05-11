const { DataTypes } = require('sequelize');
const User = require('../models/user');
const Ingredient = require('../models/ingredient');
const RecipeIngredient = require('../models/recipeIngredient');
const sequelize = require('../db');


/**
 * Recipe: Modelo que representa la entidad de la base de datos para las recetas
 * 
 * @property { INTEGER } id : el identificador de la receta 
 * @property { INTEGER } userId : el identificador del usuario al que pertenece la receta
 * @property { STRING } title   : el titulo de la receta
 * @property { STRING } image : la cadena url de la imagen de portada de la receta
 * @property { STRING } description : descripción de la receta
 * @property { STRING } steps : los pasos de elaboración de la receta
 * @property { DOUBLE } rate : la calificación de la receta
 * @property {DATE} createdAt : la fecha en la que se creó la receta
 * @property {DATE} modifiedAt : la fecha en la que se modificó la receta
 * @property {TINYINT} status : valor de estatus de la receta 1 = activado, 0 = desactivado
 * 
 * Belongs to: User
 * Belongs to Many: Ingredients
 */
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
Recipe.belongsToMany(Ingredient, { through: RecipeIngredient });

module.exports = Recipe;