const { success, error, validation } = require("../utils/helpers/baseResponse");
const statusCode = require('../utils/helpers/statusCode');
const commentService = require('../services/commentService');

const getAllComment = (req, res) => {
    const {
        params: { recipeId }
    } = req

    if (!recipeId || String(recipeId) < 0) {
        res
            .status(statusCode.UnprocessableContent)
            .json(validation([{ recipeId: recipeId }]));
        return;
    }

    return commentService.getAllComment(recipeId).then(comments => {
        res
            .status(statusCode.OK)
            .json(success("OK", { comments: comments }, statusCode.OK));
    });
};

module.exports = { getAllComment };