const { success, error, validation } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');
const { GetConfigPagination } = require('../utils/helpers/paginatorInit');

const statusCode = require('../utils/helpers/statusCode');
const ingredientService = require('../services/ingredientService');

const postIngredient = (req, res) => {
    try {
        var body = req.body;

        Validator.ValidateId(req.id, "El id del ingrediente es inválido");

        return ingredientService.postIngredient(body).then(ingredient => {
            res
                .status(statusCode.Created)
                .json(success("OK", ingredient, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
};

const getAllIngredient = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);

        return recipeService.getAllIngredient(pagination).then(ingredients => {
            res
                .status(statusCode.OK)
                .json(success("OK", ingredients.data, statusCode.OK, pagination.header, ingredients.totalPage));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const updateIngredient = (req, res) => {
    try {
        var body = req.body;
        var id = body.params.id;

        Validator.ValidateId(id, "El id de la receta es inválido");

        return ingredientService.updateIngredient(id, body).then(updatedRow => {
            if (updatedRow == null) {
                res
                    .status(statusCode.OK)
                    .json(success("Ingrediente a actualizar no encontrado", null, statusCode.OK));
            } else {
                res
                    .status(statusCode.OK)
                    .json(success("OK", updatedRow, statusCode.OK));
            }
        });
    } catch (e) {
        HandlerException(e, res)
    }
};

const deleteIngredient = (req, res) => {
    try {
        var body = req.body;
        var id = req.params.id;

        Validator.ValidateId(recipeId, "El id del ingrediente es inválido");

        return ingredientService.deleteIngredient(recipeId, body).then(deletedRow => {
            if (deletedRow == null) {
                res
                    .status(statusCode.OK)
                    .json(success("ingrediente a desactivar no encontrado", null, statusCode.OK));
            } else {
                res
                    .status(statusCode.OK)
                    .json(success("OK", deletedRow, statusCode.OK));
            }
        });
    } catch (e) {
        HandlerException(e, res)
    }
};

const reactivateIngredient = (req, res) => {
    try {
        var body = req.body;
        var id = req.params.id;

        Validator.ValidateId(id, "El id del ingrediente es inválido");

        return ingredientService.reactivateIngredient(id, body).then(reactivatedRow =>{
            if(reactivatedRow == null){
                res
                    .status(statusCode.OK)
                    .json(success("ingrediente a reactivar no encontrado", null, statusCode.OK));
            }else{
                res
                    .status(statusCode.OK)
                    .json(success("OK", reactivatedRow, statusCode.OK));
            }
        });
    }catch(e){
        HandlerException(e);
    }
};

module.exports = { postIngredient, getAllIngredient, updateIngredient, deleteIngredient, reactivateIngredient};