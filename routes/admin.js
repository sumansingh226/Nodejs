const express = require("express");
const path = require("path");
const Router = express.Router();

const products = [];

// Define a route
Router.post("/add-product", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

Router.get("/product", (req, res, next) => {
    products.push({ title: req.body.title })
    res.redirect("/");
});
module.exports = {
    Router: Router,
    products: products
};
