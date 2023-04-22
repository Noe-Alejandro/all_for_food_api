const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router
    .get("/:id", userController.getAllUser)
    .post("/", userController.postUser)
    .put("/:id", userController.putUSer)

module.exports = router;