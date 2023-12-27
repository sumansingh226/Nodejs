const http = require("http");
const routes = require("./routes");
const express = require("express");

const app = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

// Define a route
app.get("/message", (req, res) => {
    res.send("Hello, This is an Express Message!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
