const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const { validateJWT } = require('../../middleware/auth/auth');

router
    .post("/", authController.authUser)
    .post("/getInfo", validateJWT, authController.authToken);

module.exports = router;