const { response } = require('express');
const Comment = require('../database/models/comment');

const getAllComment = (recipeId, userId = null) => {
    return Comment.findAll({
        where: {
            recipeId: recipeId
        }
    }).then(comments => {
        var commentsObject = JSON.parse(JSON.stringify(comments, null, 2));
        var myComments = [];
        if (userId != null) {
            myComments = commentsObject.filter(function (comment) {
                return comment.userId == userId;
            });
            comments = commentsObject.filter(function (comment) {
                return comment.userId != userId;
            });
        }
        return myComments.length > 0 ? JSON.parse(JSON.stringify(
            {
                myComments: myComments,
                comments: comments
            }, null, 2)) : JSON.parse(JSON.stringify({ comments: comments }, null, 2));
    });
};

const postComment = (req) => {
    return Comment.create({
        recipeId: req.recipeId,
        userId: req.userId,
        comment: req.comment,
        createdAt: Date.now(),
        modifiedAt: Date.now()
    }).then(comment => {
        return comment;
    });
};

const putComment = async (id, req) => {
    const commentEntity = await Comment.findOne({
        where: {
            id: id
        }
    });
    if (!commentEntity) {
        return null;
    }
    return Comment.update(
        {
            comment: req.comment,
            modifiedAt: Date.now()
        },
        {
            where: {
                id: id
            }
        }).then(result => {
            return result[0]
        }
        );
}

const deleteComment = async (id) => {
    const commentEntity = await Comment.findOne({
        where: {
            id: id
        }
    });
    if (!commentEntity) {
        return null;
    }

    return Comment.destroy(
        {
            where: {
                id: id
            }
        }).then(result => {
            console.log(result);
            return result
        }
        );
}

module.exports = { getAllComment, postComment, putComment, deleteComment };