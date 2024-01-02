const express = require("express");
const Router = express.Router();
const path = require('path');
const adminData = require("./admin")
// Define a route
Router.get("/", (req, res) => {
    console.log(adminData.products);
    const filePath = path.join(__dirname, "../", 'views', 'shop.html');
    res.sendFile(filePath);
});;



module.exports = Router;