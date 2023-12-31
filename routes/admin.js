const express = require("express");

const Router = express.Router();
// Define a route
Router.get("/add-product", (req, res, next) => {
    res.send(
        `<form action="/product" method="POST"> <input type="text" name="title"/> <button type="submit">Submit</button> </form>`
    );
});

Router.get("/product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});
module.exports = Router;
