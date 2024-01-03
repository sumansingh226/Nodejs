const http = require("http");
const routes = require("./routes");
const express = require("express");
const path = require("path");
const { Router } = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const app = express();

app.set("view engine", 'pug')
// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

app.use("/admin", Router);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, 'public')));


//define 404  
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "./views", "PageNotFound.html"))
})
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
