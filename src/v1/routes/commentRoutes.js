const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/commentController');

router
    .get("/:recipeId", commentController.getAllComment);

module.exports = router;