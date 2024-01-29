const monggoseUserModel = require("../models/monggoseUserModel");

exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        isAuthenticated: req.IsLoggedIn,
    });
};

exports.postLogin = (req, res, next) => {
    res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10; HttpOnly");
    monggoseUserModel.findById("65b2d761f9c61f421b37f9de").then((user) => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect("/");
    });
};

exports.postLogOut = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return next(err); // Forward the error to the error-handling middleware
        }
        res.redirect("/");
    });
};
