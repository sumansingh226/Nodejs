const express = require("express");
const Router = express.Router();
const path = require('path');
const { products } = require("./admin");
// Define a route
Router.get("/", (req, res) => {
    res.render("shop", { props: products, docTitle: "Shop" })
});;



module.exports = Router;