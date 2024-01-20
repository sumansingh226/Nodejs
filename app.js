const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const Product = require("./models/seqProduct");
const User = require("./models/user");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);


const synchronizeDatabase = async () => {
    try {
        // Sync the Product and User models
        await Product.sync({ force: false });
        await User.sync({ force: false });

        // Check if the user with id 1 exists
        let user = await User.findByPk(1);

        if (!user) {
            // If user doesn't exist, create a new user
            user = await User.create({
                id: 1,
                name: "suman chauhan",
                email: "suman.singh@gmail.com"
            });
            console.log("New user created:", user.toJSON());
        } else {
            console.log("User already exists:", user.toJSON());
        }

        console.log("Database and tables synced successfully");
        // Update the flag to indicate that the database has been synchronized
        databaseSynced = true;
    } catch (error) {
        console.error("Error synchronizing the database:", error);
        // Handle the error as needed
    }
};

// Call the function to synchronize the database
synchronizeDatabase();

// Optionally, you can handle SIGINT signal to gracefully close the server on Ctrl+C
process.on("SIGINT", () => {
    // Perform cleanup or any necessary tasks before exiting
    console.log("Server shutting down");
    process.exit();
});
