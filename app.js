const http = require("http");
const routes = require("./routes");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

// Define a route
app.get("/message", (req, res) => {
    res.send("Hello, This is an Express Message!");
});
// Define a route
app.get("/add-product", (req, res, next) => {
    res.send(
        `<form action="/product" method="POST"> <input type="text" name="title"/> <button type="submit">Submit</button> </form>`
    );
});

app.get("/product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
