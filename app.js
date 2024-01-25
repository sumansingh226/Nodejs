const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/monggoseUserModel");
const port = process.env.PORT || 3000; // Use the provided PORT or default to 3000
const mongoose = require("mongoose");
require("dotenv").config();



app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
    User.findById('65b01476ce17e45f6b8944bd')
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
        });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

const connectToMongoDB = async () => {
    const dbURI = process.env.CONNECTION_URL;

    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");

        const user = await User.findById("65b01476ce17e45f6b8944bd");

        if (!user) {
            const newUser = new User({
                name: "Suman Singh",
                email: "suman1112@gmail.com",
                cart: {
                    items: [],
                },
            });

            await newUser.save();
            console.log("User added");
        }

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

connectToMongoDB();


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

