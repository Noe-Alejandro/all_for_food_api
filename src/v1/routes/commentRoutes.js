const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/commentController');

router
    .get("/:recipeId", commentController.getAllComment)
    .get("/:recipeId/:userId", commentController.getMyComments)
    .post("/", commentController.postComment)
    .put("/:commentId", commentController.putComment)
    .delete("/:commentId", commentController.deleteComment);

module.exports = router;