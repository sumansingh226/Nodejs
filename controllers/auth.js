const User = require("../models/monggoseUserModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const { validationResult } = require("express-validator")

exports.getSignUp = (req, res, next) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    }
    res.render("auth/signup", {
        path: "/signup",
        pageTitle: "SignUp",
        isAuthenticated: req.session.isLoggedIn,
        errorMessage: message,
        oldInput: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });
};

exports.postSignUp = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            const errors = validationErrors.array().map(error => error.msg);
            res.render("auth/signup", {
                path: "/signup",
                pageTitle: "SignUp",
                isAuthenticated: req.session.isLoggedIn,
                errorMessage: message,
                oldInput: { name, email, password, confirmPassword }
            });
        }
        const { name, email, password, confirmPassword } = req.body;
        // Check if user with the same email already exists
        const userDoc = await User.findOne({ email: email });
        if (userDoc) {
            req.flash("error", "Email already exists. Please pick a different email.");
            return res.render("auth/signup", {
                path: "/signup",
                pageTitle: "SignUp",
                isAuthenticated: req.session.isLoggedIn,
                errorMessage: message,
                oldInput: { name, email, password, confirmPassword }
            });
        }
        // Hash the password
        const hashPassword = await bcrypt.hash(password, 12);
        // Create new user
        const user = new User({
            name: name,
            email: email,
            password: hashPassword,
            cart: { items: [] }
        });
        // Save the user to the database
        await user.save();
        // Send a welcome email to the user
        await sendWelcomeEmail(email, name);
        req.flash("success", "You have successfully signed up!");
        return res.redirect("/login");
    } catch (err) {
        console.error("Error in postSignUp:", err);
        req.flash("error", "An error occurred. Please try again later.");
        return res.redirect("/signup");
    }
};

// Function to send a welcome email
const sendWelcomeEmail = async (toEmail, userName) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.Pass,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: toEmail,
        subject: "Welcome to E-shop",
        text: `Hello ${userName},\n\nWelcome to E-shop! Thank you for signing up.\n\nBest regards,\nThe Your App Team`,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully.");
    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
};

exports.getLogin = (req, res, next) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    } else message = null;
    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        isAuthenticated: req.session.isLoggedIn,
        errorMessage: message,
    });
};

exports.postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.redirect("/login");
        }
        const doMatch = await bcrypt.compare(password, user.password);
        if (doMatch) {
            res.setHeader("Set-Cookie", "loggedInCookie=true; Max-Age=10; HttpOnly");
            req.session.isLoggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        } else {
            req.flash("error", "invalid user name  or password!");
            return res.redirect("/login");
        }
    } catch (err) {
        console.error(err);
        return res.redirect("/login");
    }
};

exports.postLogOut = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
        }
        res.redirect("/");
    });
};


exports.getResetPassword = (req, res, next) => {
    let message = req.flash("error");
    if (message.length > 0) {
        message = message[0];
    } else message = null;
    res.render("auth/reset", {
        path: "/reset-password",
        pageTitle: "Reset Password",
        isAuthenticated: req.session.isLoggedIn,
        errorMessage: message,
    });
};


const sendPasswordResetEmail = async (toEmail, resetToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.Pass,
        },
    });

    const resetLink = `http://localhost:3000/update-password?token=${resetToken}`;
    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: toEmail,
        subject: "Password Reset - E-shop",
        html: `
        <html>
        <head>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    color: #333;
                    margin: 20px;
                }
                h2 {
                    color: #0066cc;
                }
                p {
                    margin-bottom: 15px;
                }
                a {
                    color: #0066cc;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
                .container {
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Hi there!</h2>
                <p>We received a request to reset your password for E-shop.</p>
                <p>Click the following link to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>Best regards,</p>
                <p>The E-shop Team</p>
            </div>
        </body>
    </html>

        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Password reset email sent successfully.");
    } catch (error) {
        console.error("Error sending password reset email:", error);
    }
};

exports.postResetPassword = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            req.flash("error", "Error occurred");
            return res.redirect("/reset-password");
        }
        const token = buffer.toString("hex");
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    req.flash("error", "User does not exist with the given email.");
                    return res.redirect("/reset-password");
                } else {
                    // Set the resetToken and resetTokenExpiration correctly
                    user.resetToken = token;
                    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour

                    return user.save();
                }
            })
            .then((user) => {
                // After saving the user, send the password reset email
                sendPasswordResetEmail(req.body.email, token);
                req.flash("success", "Password reset email sent successfully.");
                res.redirect("/");
            })
            .catch((err) => {
                console.error(err);
                req.flash("error", "An error occurred.");
                res.redirect("/reset-password");
            });
    });
};

exports.getUpdatePassword = (req, res, next) => {
    const token = req.query.token;
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then((user) => {
            let message = req.flash("error");
            if (message.length > 0) {
                message = message[0];
            } else message = null;
            res.render("auth/update-password", {
                path: `/update-password?token=${token}`,
                pageTitle: "Update Password",
                isAuthenticated: req.session.isLoggedIn,
                errorMessage: message,
                userId: user._id.toString(),
                passwordToken: token,
            });
        })
        .catch((err) => {
            console.log("err", err);
        });
};


exports.postUpdatePassword = async (req, res, next) => {
    try {
        const { password, userId, passwordToken } = req.body;

        const resetUser = await User.findOne({
            _id: userId,
            resetToken: passwordToken,
            resetTokenExpiration: { $gt: Date.now() },
        });

        if (!resetUser) {
            // If no user is found with the given criteria
            req.flash("error", "Invalid reset token or expired link.");
            return res.redirect("/update-password"); // Redirect to the update password page with an error message
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update user's password and reset token fields
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;

        await resetUser.save(); // Save the updated user details

        res.redirect("/login");
    } catch (err) {
        req.flash("error", "An error occurred.");
        res.redirect("/update-password");
        console.error("Error:", err);

    }
};
