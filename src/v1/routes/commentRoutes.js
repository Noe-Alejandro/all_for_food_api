const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/commentController');

router
    .get("/recipeId=:recipeId", commentController.getAllComment)
    .post("/", commentController.postComment)
    .put("/:commentId", commentController.putComment);

module.exports = router;