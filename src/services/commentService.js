const Comment = require('../database/models/comment');
const User = require('../database/models/user');

/**
 * Obtiene todos los comentarios en la receta del request
 * 
 * @param {*} recipeId : El id de la receta
 * @param {*} pagination : Configuración de paginación
 * @returns regresa una promesa que se resuelve con un objeto que contiene los comentarios y el número total de páginas
 */
const getAllComment = async (recipeId, pagination) => {
    const amount = await Comment.count({
        where: {
            recipeId: recipeId
        }
    });

    return Comment.findAll({
        include: User,
        where: {
            recipeId: recipeId
        },
        limit: pagination.options.limit,
        offset: pagination.options.offset
    },
    ).then(comments => {
        return JSON.parse(JSON.stringify({ data: comments, totalPage: Math.ceil(amount / pagination.header.size) }, null, 2));
    });
};

/**
 * Obtiene todos los comentarios asociados a un usuario en una receta específica
 * 
 * @param {*} recipeId : El id de la receta
 * @param {*} userId : El id del usuario
 * @param {*} pagination : Configuración de la paginación
 * @returns regresa una promesa que se resuelve con un objeto que tiene los comentarios y el número de páginas
 */
const getMyComments = async (recipeId, userId, pagination) => {
    const amount = await Comment.count({
        where: {
            recipeId: recipeId,
            userId: userId
        }
    });
    return Comment.findAll({
        include: User,
        where: {
            recipeId: recipeId,
            userId: userId
        }
    }, pagination.options
    ).then(comments => {
        return JSON.parse(JSON.stringify({ data: comments, totalPage: Math.ceil(amount / pagination.header.size) }, null, 2));
    });
};

/**
 * Método post que crea un nuevo comentario
 * @param {*} req : Información del request: información del comentario
 * @returns regresa una promesa que se resuelve con el comentario creado
 */
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

/**
 * Método put que actualiza la información de un comentario
 * @param {*} req : Información del request: id del comentario, información del comentario
 * @returns regresa una promesa que se resuelve con el comentario actualizado
 */
const putComment = async (id, req) => {
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

/**
 * Método delete que elimina de un comentario
 * @param {*} req : Información del request: id del comentario
 * @returns regresa una promesa que se resuelve con el comentario eliminado
 */
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
            return result
        }
        );
}

/**
 * Método get que obtiene un comentario con base en el id proporcionado
 * @param {*} req : Información del request: id del comentario
 * @returns regresa una promesa que se resuelve con el comentario al que le pertenece el id, devuelve null si no lo encuentra
 */
const getCommentById = async (id) => {
    const commentEntity = await Comment.findOne({
        where: {
            id: id
        }
    });
    if (!commentEntity) {
        return null;
    } else {
        return commentEntity.dataValues;
    }
}

module.exports = { getAllComment, postComment, putComment, deleteComment, getMyComments, getCommentById };