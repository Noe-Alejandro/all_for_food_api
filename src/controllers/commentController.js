const { success, successPage } = require("../utils/helpers/baseResponse");
const { Validator } = require('../utils/helpers/validator');
const { HandlerException } = require('../utils/helpers/errorHandler');
const { GetConfigPagination } = require('../utils/helpers/paginatorInit');

const statusCode = require('../utils/helpers/statusCode');
const commentService = require('../services/commentService');

const getAllComment = (req, res) => {
    try {
        var pagination = GetConfigPagination(req);
        var recipeId = req.params.recipeId;
        var userId = req.params.userId

        Validator.ValidateId(recipeId, "El id de la receta es inválido");
        if (userId)
            Validator.ValidateId(userId, "El id del usuario es inválido")

        return commentService.getAllComment(recipeId, pagination).then(result => {
            res
                .status(statusCode.OK)
                .json(successPage("OK", result.data, statusCode.OK, pagination.header, result.totalPage));
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