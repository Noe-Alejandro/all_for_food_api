/**
 * @class GetCommentResponse : Clase que define la respuesta del Modelo de Comment para su uso en front
 */
class GetCommentResponse {
    id;
    recipeId;
    user = {
        id: null,
        username: null
    };
    comment;
    createdAt;
    modifiedAt;

    constructor(comment) {
        this.id = comment.id;
        this.recipeId = comment.recipeId
        this.user.id = comment.user.id;
        this.user.username = comment.user.username;
        this.comment = comment.comment;
        this.createdAt = comment.createdAt;
        this.modifiedAt = comment.modifiedAt;
    }
}

/**
 * 
 * @param {*} comments : Comentario(s) a mappear
 * @returns mappedList: Comentario(s) mappeado(s) para la implementación de front
 */
function MapListComment(comments) {
    const mappedList = [];
    comments.forEach(comment => {
        mappedList.push(new GetCommentResponse(comment));
    });
    return mappedList;
}

module.exports = { GetCommentResponse, MapListComment };