const express = require("express");
const path = require("path");
const Router = express.Router();

const products = [];

// Define a route
Router.post("/add-product", (req, res, next) => {
    const payload = req.body;
    products.push(payload)
    res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
    res.redirect("/");
});

Router.get("/add-product", (req, res, next) => {
    res.render("add-product", { pageTitle: "Add Product" })
});

Router.get("/product", (req, res, next) => {
    res.redirect("/");
});
module.exports = {
    Router: Router,
    products: products
};
