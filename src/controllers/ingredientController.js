const { success } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');
const { GetConfigPagination } = require('../utils/helpers/paginatorInit');

const statusCode = require('../utils/helpers/statusCode');
const ingredientService = require('../services/ingredientService');

const postIngredient = (req, res) => {
    try {
        var body = req.body;

        return ingredientService.postIngredient(body).then(ingredient => {
            res
                .status(statusCode.Created)
                .json(success("Created", ingredient, statusCode.Created));
        });
    } catch (e) {
        HandlerException(e, res)
    }
};

const getAllIngredient = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);

        return ingredientService.getAllIngredient(pagination).then(ingredients => {
            res
                .status(statusCode.OK)
                .json(success("OK", ingredients.data, statusCode.OK, pagination.header, ingredients.totalPage));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const deleteIngredient = async (req, res) => {
    try {
        var id = req.params.ingredientId;

        Validator.ValidateId(id, "El id del comentario es inválido");

        var ingredient = await ingredientService.getIngredientById(id);

        if (!ingredient) {
            return res
                .status(statusCode.OK)
                .json(success("No se encontró un ingrediente con el id proporcionado", null, statusCode.OK));
        }

        return ingredientService.deleteIngredient(id).then(deletedRow => {
            res
                .status(statusCode.OK)
                .json(success("OK", deletedRow, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

module.exports = { postIngredient, getAllIngredient, deleteIngredient };