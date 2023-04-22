const { success, error, validation } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');

const statusCode = require('../utils/helpers/statusCode');
const commentService = require('../services/commentService');

const getAllComment = (req, res) => {
    try {
        var recipeId = req.params.recipeId;

        Validator.ValidateId(recipeId, "El id de la receta es inválido");

        return commentService.getAllComment(recipeId).then(comments => {
            res
                .status(statusCode.OK)
                .json(success("OK", { comments: comments }, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

module.exports = { getAllComment };