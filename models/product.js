const db = require("../db/mySqlDbConntection");

module.exports = class Product {
    constructor(productsInformation) {
        this.productsInformation = productsInformation;
    }

    save() {
        return db.execute(
            "INSERT INTO products (title, image, price, quantity, description) VALUES (?, ?, ?, ?, ?)",
            [
                this.productsInformation.title,
                this.productsInformation.image,
                this.productsInformation.price,
                this.productsInformation.quantity,
                this.productsInformation.description,
            ]
        );
    }

    Edit(id) { }
    static deleteProduct(id) {
        return db.execute("DELETE  FROM products WHERE productID = ?", [id]);
    }

    static fetchAll() {
        return db.execute("SELECT * FROM products");
    }

    static fetchById(id) {
        return db.execute("SELECT * FROM products WHERE productID = ?", [id]);
    }
};
