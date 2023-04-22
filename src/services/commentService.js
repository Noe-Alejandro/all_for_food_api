const Comment = require('../database/models/comment');

const getAllComment = () => {
    return Comment.findAll().then(comments => {
        return JSON.parse(JSON.stringify(comments, null, 2));
    });
};

module.exports = {getAllComment};