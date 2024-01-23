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
        // Check if this is the first time connecting
        if (db._hasOpened == null || db._hasOpened === false) {
            console.log('Database is newly created');
        }
        db._hasOpened = true; // Set the flag to true after the first connection
    });

}

// Call the function to connect to MongoDB
connectToMongoDB();

