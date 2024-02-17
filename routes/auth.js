const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const { check, body } = require("express-validator");

// Signup Routes
router.get("/signup", authController.getSignUp);

router.post(
    "/signup",
    [
        check("email")
            .isEmail()
            .withMessage("Please enter a valid email address.")
            .custom((value, { req }) => {
                if (value === "test@test.com") {
                    throw new Error(
                        "This email is not allowed. Please use a different one."
                    );
                }
                return true;
            }),
        body("password")
            .isLength({ min: 5 })

            .withMessage(
                "Password must be at least 5 characters long and contain only letters and numbers."
            ),
        body("confirmPassword")
            .exists()
            .withMessage("Please confirm your password.")
            .equals(body("password"))
            .withMessage("Password confirmation must match the password."),
    ],
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
