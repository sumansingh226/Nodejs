const User = require("../models/monggosProductSchema")
const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongoDB = () => {
    const dbURI = process.env.CONNECTION_URL;
    mongoose
        .connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            User.findById("65b01476ce17e45f6b8944bd").then((user) => {
                if (!user) {
                    const user = new User({
                        name: "Suman Singh",
                        email: "suman1112@gmail.com",
                        cart: {
                            items: [],
                        },
                    });
                    user.save().then(() => console.log("user added"));
                }
            });
        });
    const db = mongoose.connection;
    db.on("connected", () => {
        console.log("Connected to MongoDB");
    });
}

module.exports = connectToMongoDB;
