const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

router
    .post("/", authController.authUser)
    .post("/test", authController.validateJWT, authController.authToken);

module.exports = router;