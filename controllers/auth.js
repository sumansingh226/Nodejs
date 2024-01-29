exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        isAuthenticated: req.IsLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10; HttpOnly')
    req.session.isLoggedIn = true;
    res.redirect("/")
};
