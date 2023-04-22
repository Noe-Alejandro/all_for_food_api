const express = require('express');
const router = express.Router();
const recipeController = require('../../controllers/recipeController');

router
    .post("/", recipeController.postRecipe)
    .get("/", recipeController.getAllRecipe)
    .get("/:recipeId", recipeController.getRecipeById)
    .put("/:recipeId", recipeController.updateRecipe);

module.exports = router;