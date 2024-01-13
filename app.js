const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const db = require("./db/mySqlDbConntection")

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

db.execute('SELECT * FROM products')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
