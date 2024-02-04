const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.get("/signup", authController.getSignUp);
router.post("/signup", authController.postSignUp);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogOut);
router.get("/reset-password", authController.getResetPassword)
router.post("/reset-password", authController.postResetPassword)
router.get("/update-password/?:token", authController.getUpdatePassword)
router.post("/update-password/?:token", authController.postUpdatePassword)

module.exports = router;
