const express = require("express");
const Router = express.Router();
const path = require('path');

// Define a route
Router.get("/", (req, res) => {
    const filePath = path.join(__dirname, "../", 'views', 'shop.html');
    res.sendFile(filePath);
});;



module.exports = Router;