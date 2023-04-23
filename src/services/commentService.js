const Comment = require('../database/models/comment');

const getAllComment = async (recipeId, pagination) => {
    const amount = await Comment.count({
        where: {
            recipeId: recipeId
        }
    });

    return Comment.findAll(pagination.options, {
        where: {
            recipeId: recipeId
        }
    }).then(comments => {
        return JSON.parse(JSON.stringify({ data: comments, totalPage: Math.ceil(amount / pagination.header.size) }, null, 2));
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