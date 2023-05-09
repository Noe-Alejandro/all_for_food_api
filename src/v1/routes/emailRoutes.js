const express = require('express');
const router = express.Router();
const emailController = require('../../controllers/emailController');
const { validateJWT, validateAdmin } = require('../../middleware/auth/auth');


router
    .post("/", emailController.sendEmail);
module.exports = router;




