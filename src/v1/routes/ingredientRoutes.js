const express = require('express');
const router = express.Router();
const ingredientController = require('../../controllers/ingredientController');
const { validateJWT, validateAdmin } = require('../../middleware/auth/auth');

router
    .get("/", ingredientController.getAllIngredient)
    .post("/", [validateJWT, validateAdmin], ingredientController.postIngredient)
    .delete("/:ingredientId", [validateJWT, validateAdmin], ingredientController.deleteIngredient);;

module.exports = router;