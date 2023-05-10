const express = require('express');
const router = express.Router();
const recipeController = require('../../controllers/recipeController');
const { validateJWT, validateAdmin } = require('../../middleware/auth/auth');

router
    .get("/", recipeController.getAllRecipe)
    .post("/title", recipeController.getAllRecipeByTitle)
    .post("/ingredients", recipeController.getAllRecipeByIngredients)
    .get("/:recipeId", recipeController.getRecipeById)
    .get("/my/:userId", recipeController.getMyRecipes)
    .get("/myFollows/:userId", recipeController.getRecipesFromMyFollowings)
    .get("/search/random", recipeController.getRandomRecipe)
    .get("/admin/getAll/:status", [validateJWT, validateAdmin], recipeController.getAllRecipeForAdmin)
    .post("/", validateJWT, recipeController.postRecipe)
    .put("/:recipeId", validateJWT, recipeController.updateRecipe)
    .put("/delete/:recipeId", [validateJWT, validateAdmin], recipeController.deleteRecipe)
    .put("/reactivate/:recipeId", [validateJWT, validateAdmin], recipeController.reactivateRecipe);

module.exports = router;