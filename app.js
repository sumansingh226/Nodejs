const http = require("http");
const routes = require("./routes");
const express = require("express");

const app = express();

app.use((req, res, next) => {
    console.log("middlewhare");
    res.send("<h1>Hello from expfress");
    next(); // allow the request tocontinue the next middleware in lione
});


// Define a route
app.get("/", (req, res) => {
    res.send("Hello, Express!");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
