const User = require("../models/monggoseUserModel");
const bcrypt = require("bcryptjs");

exports.getSignUp = (req, res, next) => {
    res.render("auth/signup", {
        path: "/signup",
        pageTitle: "SignUp",
        isAuthenticated: req.IsLoggedIn,
    });
};
exports.postSignUp = (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    User.findOne({ email: email })
        .then((userDoc) => {
            if (userDoc) {
                return res.redirect("/signup");
            }
            bcrypt.hash(password, 12).then((hashPassword) => {
                const user = new User({
                    name: name,
                    email: email,
                    password: hashPassword,
                    cart: { items: [] },
                });
                return user.save();
            });
        })
        .then((result) => {
            console.log(result);
            return res.redirect("/login");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        isAuthenticated: req.IsLoggedIn,
    });
};

exports.postLogin = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.redirect("/login");
            }

            bcrypt.compare(password, user.password)
                .then((doMatch) => {
                    if (doMatch) {
                        res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10; HttpOnly");
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return res.redirect("/");
                    } else {
                        return res.redirect("/login");
                    }
                })
                .catch(err => {
                    console.log(err);
                    return res.redirect("/login");
                });
        })
        .catch(err => {
            console.log(err);
            return res.redirect("/login");
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
