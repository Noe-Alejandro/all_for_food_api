const express = require('express');
const router = express.Router();
const recipeController = require('../../controllers/recipeController');
const { validateJWT, validateAdmin } = require('../../middleware/auth/auth');

router
    .get("/", recipeController.getAllRecipe)
    .post("/title", recipeController.getAllRecipeByTitle)
    .post("/ingredients", recipeController.getAllRecipeByIngredients)
    .get("/:recipeId", recipeController.getRecipeById)
    .get("/admin/getAll/:status", [validateJWT, validateAdmin], recipeController.getAllRecipeForAdmin)
    .post("/", validateJWT, recipeController.postRecipe)
    .put("/:recipeId", validateJWT, recipeController.updateRecipe)
    .put("/delete/:recipeId", [validateJWT, validateAdmin], recipeController.deleteRecipe)
    .put("/reactivate/:recipeId", [validateJWT, validateAdmin], recipeController.reactivateRecipe);

module.exports = router;