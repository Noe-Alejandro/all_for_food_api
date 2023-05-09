const express = require('express');
const router = express.Router();
const scoreController = require('../../controllers/scoreController');
const { validateJWT } = require('../../middleware/auth/auth');

router
    .get("/:userId/:recipeId", scoreController.getMyScore)
    .post("/", validateJWT, scoreController.postScore)
    .put("/:userId/:recipeId", validateJWT, scoreController.putScore)
    .delete("/:userId/:recipeId", validateJWT, scoreController.deleteScore);

module.exports = router;