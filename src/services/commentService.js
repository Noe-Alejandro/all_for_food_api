const Comment = require('../database/models/comment');

const getAllComment = (recipeId) => {
    return Comment.findAll({
        where: {
            recipeId: recipeId
        }
    }).then(comments => {
        return JSON.parse(JSON.stringify(comments, null, 2));
    });
};

module.exports = { getAllComment };