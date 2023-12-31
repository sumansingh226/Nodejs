const express = require("express");
const path = require("path");

const Router = express.Router();
// Define a route
Router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

Router.get("/product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});
module.exports = Router;
