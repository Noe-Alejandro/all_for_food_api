const express = require('express');
const router = express.Router();
const ingredientController = require('../../controllers/ingredientController');

router
    .get("/", ingredientController.getAllIngredient)
    .post("/", ingredientController.postIngredient)
    .put("/delete/:id", ingredientController.deleteIngredient)
    .put("/reactivate/:id", ingredientController.reactivateIngredient);

module.exports = router;