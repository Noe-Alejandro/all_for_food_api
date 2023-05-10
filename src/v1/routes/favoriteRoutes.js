const express = require('express');
const router = express.Router();
const favoriteController = require('../../controllers/favoriteController');
const { validateJWT } = require('../../middleware/auth/auth');

router
    .get("/:userId", favoriteController.getMyFavorites)
    .post("/", validateJWT, favoriteController.postFavorite)
    .delete("/:userId/:recipeId", validateJWT, favoriteController.deleteFavorite);

module.exports = router;