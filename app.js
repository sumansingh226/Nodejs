const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/monggoseUserModel");
const { default: connectToMongoDB } = require("./db/MongoDbAtlas");
const port = process.env.PORT || 3000; // Use the provided PORT or default to 3000


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

async function connectToMongoDbAtls() {
    try {
        await connectToMongoDB()
    } catch (error) {
        console.log("something went wrong while connection to database.");

    }
}
connectToMongoDbAtls()

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

