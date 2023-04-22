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

module.exports = { getAllComment, postComment, putComment };