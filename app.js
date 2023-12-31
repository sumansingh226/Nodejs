const http = require("http");
const routes = require("./routes");
const express = require("express");
const adminRoute = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const app = express();

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRoute);
app.use(shopRoutes);


//define 404  
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found 🤷‍♂️</h1>')
})
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
