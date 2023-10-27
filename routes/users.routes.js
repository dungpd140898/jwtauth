const userController  =require("../controllers/users.controller")
const { authenticateToken } = require('../middlewares/auth')
const express = require("express");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user-profile", authenticateToken, userController.userProfile)

module.exports = router;