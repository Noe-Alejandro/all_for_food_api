const express = require('express');
const router = express.Router();
const ingredientController = require('../../controllers/ingredientController');

router
    .get("/", ingredientController.getAllIngredient)
    .post("/", ingredientController.postIngredient)
    .delete("/:ingredientId", ingredientController.deleteIngredient);;

module.exports = router;