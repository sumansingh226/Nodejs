const User = require("../models/monggoseUserModel");
const bcrypt = require("bcryptjs");

exports.getSignUp = (req, res, next) => {
    res.render("auth/signup", {
        path: "/signup",
        pageTitle: "SignUp",
        isAuthenticated: req.IsLoggedIn,

    })

}
exports.postSignUp = (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    User.findOne({ email: email }).then(userDoc => {
        if (userDoc) {
            return res.redirect("/signup")
        }
        const user = new User({
            name: name,
            email: email,
            password: password,
            cart: { items: [] }
        })
        return user.save();
    }).then(result => {
        console.log(result);
        return res.redirect("/login")
    }).catch(err => {
        console.log(err);
    })

}

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
        }
        res.redirect("/");
    });
};
