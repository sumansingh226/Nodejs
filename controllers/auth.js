const User = require("../models/monggoseUserModel");
const bcrypt = require("bcryptjs");

exports.getSignUp = (req, res, next) => {
    res.render("auth/signup", {
        path: "/signup",
        pageTitle: "SignUp",
        isAuthenticated: req.IsLoggedIn,
    });
};

exports.postSignUp = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const userDoc = await User.findOne({ email: email });
        if (userDoc) {
            return res.redirect("/signup");
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = new User({
            name: name,
            email: email,
            password: hashPassword,
            cart: { items: [] },
        });
        const result = await user.save();
        console.log(result);
        return res.redirect("/login");
    } catch (err) {
        console.error(err);
        return res.redirect("/signup");
    }
};


exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        isAuthenticated: req.IsLoggedIn,
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
            res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10; HttpOnly");
            req.session.isLoggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        } else {
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
