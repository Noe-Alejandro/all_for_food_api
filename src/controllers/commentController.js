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
                .json(success("OK", comments, statusCode.OK));
        });
    } catch (e) {
        HandlerException(e, res);
    }
};

const postComment = (req, res) => {
    try {
        var body = req.body;

        Validator.ValidateId(body.recipeId, "El id de la receta es inválido");
        Validator.ValidateId(body.userId, "El id del usuario es inválido");

        return commentService.postComment(body).then(comment => {
            res
                .status(statusCode.Created)
                .json(success("Created", comment, statusCode.Created));
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

const putComment = (req, res) => {
    try {
        var body = req.body;
        var commentId = req.params.commentId;

        Validator.ValidateId(commentId, "El id del comentario es inválido");

        return commentService.putComment(commentId, body).then(affectedRow => {
            if (affectedRow == null) {
                res
                    .status(statusCode.OK)
                    .json(success("No se encontró un comentario con el id proporcionado", null, statusCode.OK));
            } else {
                res
                    .status(statusCode.OK)
                    .json(success("OK", affectedRow, statusCode.OK));
            }
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

const deleteComment = (req, res) => {
    try {
        var commentId = req.params.commentId;

        Validator.ValidateId(commentId, "El id del comentario es inválido");

        return commentService.deleteComment(commentId).then(deletedRow => {
            if (deletedRow == null) {
                res
                    .status(statusCode.OK)
                    .json(success("No se encontró un comentario con el id proporcionado", null, statusCode.OK));
            } else {
                res
                    .status(statusCode.OK)
                    .json(success("OK", deletedRow, statusCode.OK));
            }
        });
    } catch (e) {
        HandlerException(e, res)
    }
}

module.exports = { getAllComment, postComment, putComment, deleteComment };