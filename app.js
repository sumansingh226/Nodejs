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

// Establish the association between User and Product models

app.use((req, res, next) => {
    const currentUserId = 1;

    User.findByPk(currentUserId)
        .then((user) => {
            console.log("req.user:", user);
            req.user = user;
            next();
        })
        .catch((err) => {
            console.error("Error fetching user:", err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

let databaseSynced = false; // Initialize the flag outside the function

const synchronizeDatabase = async () => {
    try {
        // Check if the database has already been synchronized
        if (!databaseSynced) {
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
                    email: "suman.singh@gmail.com",
                });
                console.log("New user created:", user.toJSON());
            } else {
                console.log("User already exists:", user.toJSON());
            }
            Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
            User.hasMany(Product);
            console.log("Database and tables synced successfully");
            // Update the flag to indicate that the database has been synchronized
            databaseSynced = true;

            // Start the server after synchronizing the database
            app.listen(3000, () => {
                console.log("Server is running on port 3000");
            });

            // Optionally, handle SIGINT signal to gracefully close the server on Ctrl+C
            process.on("SIGINT", () => {
                // Perform cleanup or any necessary tasks before exiting
                console.log("Server shutting down");
                process.exit();
            });
        } else {
            console.log("Database already synced. Skipping synchronization.");
        }
    } catch (error) {
        console.error("Error synchronizing the database:", error);
        // Handle the error as needed
    }
};

// Placeholder for the Express.js application (replace this with your actual app)

// Call the function to synchronize the database and start the server
synchronizeDatabase();
