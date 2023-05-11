const express = require('express');
const router = express.Router();
const emailController = require('../../controllers/emailController');

router
    .post("/toService", emailController.sendEmailToService);
module.exports = router;