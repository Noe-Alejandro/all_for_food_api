const Ingredient = require('../database/models/ingredient');
const RecipeIngredient = require("../database/models/recipeIngredient");

/**
 * Crea un nuevo ingrediente.
 * 
 * @param {*} req : Información del request: info del ingrediente 
 * @returns una promesa que se resuelve con el ingrediente creado
 */
const postIngredient = (req) => {
    return Ingredient.create({
        id: req.id,
        name: req.name
    }).then(ingredient => {
        return ingredient;
    })
}

/**
 * Obtiene todos los ingredientes paginados
 * @param {*} pagination : Configuración de la paginación
 * @returns una promesa que se resuelve con los ingredientes obtenidos
 */
const getAllIngredient = async (pagination) => {
    return Ingredient.findAndCountAll(pagination.options, {
        where: {
            status: 1
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    }).then(ingredients => {
        return JSON.parse(JSON.stringify({ data: ingredients.rows, totalPage: Math.ceil(ingredients.count / pagination.header.size) }, null, 2));
    });
}

/**
 * Obtiene un ingrediente de acuerdo con el Id provisto
 * 
 * @param {*} ingredientId : Identificador del ingrediente a buscar
 * @returns una promesa que se resuelve con la identidicación del ingrediente encontrado
 */
const getIngredientById = (ingredientId) => {
    return Ingredient.findOne({
        where: {
            id: ingredientId
        }
    }
    ).then(ingredient => {
        return JSON.parse(JSON.stringify(ingredient, null, 2));
    })
};

const deleteIngredient = async (id) => {
    await RecipeIngredient.destroy({
        where: {
            ingredientId: id
        }
    });
    return Ingredient.destroy(
        {
            where: {
                id: id
            }
        }).then(result => {
            return result
        }
        );
}

module.exports = { postIngredient, getAllIngredient, getIngredientById, deleteIngredient };