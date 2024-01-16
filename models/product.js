const db = require("../db/mySqlDbConntection");

module.exports = class Product {
    static save(productsInformation) {
        return db.execute(
            "INSERT INTO products (productID, title, image, price, quantity, description) VALUES (?, ?, ?, ?, ?, ?)",
            [
                productsInformation.productID,
                productsInformation.title,
                productsInformation.image,
                productsInformation.price,
                productsInformation.quantity,
                productsInformation.description,
            ]
        );


    }

    static Edit(id) { }
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
