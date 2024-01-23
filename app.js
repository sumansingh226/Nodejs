const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const User = require("./models/user");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Order = require("./models/Order");
const mongoose = require("mongoose");
require('dotenv').config();


app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);




function connectToMongoDB() {
    const dbURI = process.env.CONNECTION_URL;

    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('connected', () => {
        console.log('Connected to MongoDB');

    });
}

// Call the function to connect to MongoDB
connectToMongoDB();

const port = process.env.PORT || 3000; // Use the provided PORT or default to 3000

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

