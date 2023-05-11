const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { validateJWT, validateAdmin } = require('../../middleware/auth/auth');

router
    .get("/:id", userController.getAllUser)
    .get("/admin/getAll/:status", [validateJWT, validateAdmin], userController.getAllUserForAdmin)
    .post("/", userController.postUser)
    .put("/:id", validateJWT, userController.putUSer)
    .put("/delete/:id", [validateJWT, validateAdmin], userController.deleteUser)
    .put("/reactive/:id", [validateJWT, validateAdmin], userController.reactiveUser);

module.exports = router;