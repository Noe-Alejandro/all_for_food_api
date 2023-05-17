const express = require('express');
const router = express.Router();
const followController = require('../../controllers/followController');
const { validateJWT } = require('../../middleware/auth/auth');

router
    .get("/getFollowings/:userId", followController.getMyFollowings)
    .get("/getFollowers/:userId", followController.getMyFollowers)
    .post("/", validateJWT, followController.postFollow)
    .post("/byUserIds", followController.getIsFollowByIds)
    .delete("/:userId/:followId", validateJWT, followController.deleteFollow);

module.exports = router;