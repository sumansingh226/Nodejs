const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const sequelize = require("./db/sequelize");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Product = require("./models/seqProduct");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
let databaseSynced = false;

// Function to sync the database and start the server
async function syncDatabaseAndStartServer() {
    try {
        // Check if the database has already been synchronized
        if (!databaseSynced) {
            // Sync the database
            await Product.sync({ force: false }); // Set force to true to drop and recreate tables
            console.log("Database synced successfully");

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
