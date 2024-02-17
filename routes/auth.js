const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const { check } = require("express-validator");

// Signup Routes
router.get("/signup", authController.getSignUp);
router.post(
    "/signup",
    [check("email")
        .isEmail()
        .withMessage("Please Enter A Valid Email Address")
        .custom((value, { req }) => {
            if (value === "test@test.com") {
                throw new Error("Invalid email forbidden!");
            }
            return true;
        }),
    body('password')],
    authController.postSignUp
);

// Login Routes
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

// Logout Route
router.post("/logout", authController.postLogOut);

// Reset Password Routes
router.get("/reset-password", authController.getResetPassword);
router.post("/reset-password", authController.postResetPassword);

// Update Password Routes
router.get("/update-password", authController.getUpdatePassword);
router.post("/update-password", authController.postUpdatePassword);

module.exports = router;
