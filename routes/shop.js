const express = require("express");
const Router = express.Router();
const path = require('path');
const { products } = require("./admin");
// Define a route
Router.get("/", (req, res) => {
    console.log(products);
    res.render("shop")
});;



module.exports = Router;