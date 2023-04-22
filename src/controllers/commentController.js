const { success, error, validation } = require("../utils/helpers/baseResponse");
const commentService = require('../services/commentService');

const getAllComment = (req, res) => {
    return commentService.getAllComment().then(comments => {
        res
        .status(200)
        .json(success("OK", { comments: comments}, res.statusCode));
    });
};

module.exports = {getAllComment};