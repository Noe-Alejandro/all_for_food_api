const { success, error, validation } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');

const statusCode = require('../utils/helpers/statusCode');
const recipeService = require('../services/recipeService');

const postRecipe = (req, res) => {
    try {
        var body = req.body;

        Validator.ValidateId(req.userId, "El id del usuario es inválido");

        return recipeService.postRecipe(body).then(recipe => {
            res
                .status(statusCode.Created)
                .json(success("OK", recipe, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
};

const getAllRecipe = (res) => {
    try {
        return recipeService.getAllRecipe.then(recipes => {
            res
                .status(statusCode.OK)
                .json(success("OK", recipes, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const getRecipeById = (req, res) => {
    try {
        var recipeId = req.params.recipeId;

        Validator.ValidateId(recipeId, "El id de la receta es inválido");

        return recipeService.getRecipeById(recipeId).then(recipe => {
            res
                .status(statusCode.OK)
                .json(success("OK", recipe, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const updateRecipe = (req, res) => {
    try {
        var body = req.body;
        var recipeId = body.recipeId;

        Validator(recipeId, "El id de la receta es inválido");

        return recipeService.updateRecipe(recipeId, body).then(updatedRow => {
            if (updatedRow == null) {
                res
                    .status(statusCode.OK)
                    .json(success("Receta a actualizar no encontrada", null, statusCode.OK));
            } else {
                res
                    .status(statusCode.OK)
                    .json(success("OK", updatedRow, statusCode.OK));
            }
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

module.exports = { postRecipe, getAllRecipe, getRecipeById, updateRecipe };