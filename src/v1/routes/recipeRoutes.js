const express = require('express');
const router = express.Router();
const recipeController = require('../../controllers/recipeController');

router
    .get("/", recipeController.getAllRecipe)
    .get("/:recipeId", recipeController.getRecipeById)
    .post("/", recipeController.postRecipe)
    .put("/:recipeId", recipeController.updateRecipe)
    .put("/delete/:recipeId", recipeController.deleteRecipe)
    .put("/reactivate/:recipeId", recipeController.reactivateRecipe);

module.exports = router;