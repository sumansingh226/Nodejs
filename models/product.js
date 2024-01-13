module.exports = class Product {
    constructor(productsInformation) {
        this.productsInformation = productsInformation;
    }

    save() { }

    Edit(id) { }
    static deleteProduct(id) { }

    static fetchAll(callback) { }

    static fetchById(id, callback) { }
};
