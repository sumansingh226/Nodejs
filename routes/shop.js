const express = require("express");
const Router = express.Router();


// Define a route
Router.get("/", (req, res) => {
    res.send("Hello, Express!");
});

// Define a route
Router.get("/message", (req, res) => {
    res.send("Hello, This is an Express Message!");
});

module.exports = Router;