const db = require("../db/mySqlDbConntection")

module.exports = class Product {
    constructor(productsInformation) {
        this.productsInformation = productsInformation;
    }

    save() { }

    Edit(id) { }
    static deleteProduct(id) { }

    static fetchAll() {
        return db.execute('SELECT * FROM products')
    }

    static fetchById(id) { }
};
