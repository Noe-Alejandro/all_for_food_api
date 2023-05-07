const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/commentController');
const { validateJWT } = require('../../middleware/auth/auth');

router
    .get("/:recipeId", commentController.getAllComment)
    .get("/:recipeId/:userId", commentController.getMyComments)
    .post("/", validateJWT, commentController.postComment)
    .put("/:commentId", validateJWT, commentController.putComment)
    .delete("/:commentId", validateJWT, commentController.deleteComment);

module.exports = router; 