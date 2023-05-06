const express = require('express');
const router = express.Router();
const recipeController = require('../../controllers/recipeController');
const { validateJWT, validateAdmin } = require('../../middleware/auth/auth');

router
    .get("/", recipeController.getAllRecipe)
    .get("/:recipeId", recipeController.getRecipeById)
    .post("/", validateJWT, recipeController.postRecipe)
    .put("/:recipeId", validateJWT, recipeController.updateRecipe)
    .put("/delete/:recipeId", [validateJWT, validateAdmin], recipeController.deleteRecipe)
    .put("/reactivate/:recipeId", [validateJWT, validateAdmin], recipeController.reactivateRecipe);

module.exports = router;