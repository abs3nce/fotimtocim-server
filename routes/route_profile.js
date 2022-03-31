const express = require("express");
const router = express.Router();

const authUser = require("../middlewares/middleware_auth");
const profileController = require("../controllers/controller_profile");

// router.use(authUser);

router.get("/profile", authUser, profileController.getUser);

module.exports = router;
