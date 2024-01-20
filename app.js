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
let databaseSynced = false;

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

// Function to sync the database and start the server
async function syncDatabaseAndStartServer() {
    try {
        // Check if the database has already been synchronized
        if (!databaseSynced) {
            // Sync the database
            await Product.sync({ force: false }); // Set force to true to drop and recreate tables
            await User.sync({ force: false }).then(() => User.findById(1)).then((user) => {
                if (!user) {
                    User.create({ id: "1", name: "suman chauhan", email: "suman.singh@gmail.com" })

                }
                return user;
            }); // Set force to true to drop and recreate tables
            const user = await User.findById(1);
            if (!user) {
                return User.create({ id: "1", name: "suman chauhan", email: "suman.singh@gmail.com" })
            }
            console.log("Database and tables synced successfully");
            // Update the flag to indicate that the database has been synchronized
            databaseSynced = true;
        }

        // Start the server
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("Error syncing database:", error);
    }
}

// Call the function to sync the database and start the server
syncDatabaseAndStartServer();

// Optionally, you can handle SIGINT signal to gracefully close the server on Ctrl+C
process.on("SIGINT", () => {
    // Perform cleanup or any necessary tasks before exiting
    console.log("Server shutting down");
    process.exit();
});
