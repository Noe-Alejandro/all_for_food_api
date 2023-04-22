const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router
    .get("/:id", userController.getAllUser)
    .post("/", userController.postUser)
    .put("/:id", userController.putUSer)
    .put("/delete/:id", userController.deleteUser) //delete user
    .put("/reactive/:id", userController.reactiveUser) //reactive user

module.exports = router;