const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const filePath = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);

const getProductsFromFile = (cb) => {
    fs.readFile(filePath, (err, file) => {
        if (err) {
            return cb([]);
        } else {
            cb(JSON.parse(file));
        }
    });
};
module.exports = class Product {
    constructor(productsInformation) {
        this.productsInformation = productsInformation;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this.productsInformation);
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    }

    Edit(id) {
        getProductsFromFile((products) => {
            const productIndex = products.findIndex((prod) => prod.productID == id);
            products[productIndex] = { ...this.productsInformation };
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    }
    static deleteProduct(id) {
        getProductsFromFile((products) => {
            const item = products.find((prod) => prod.productID != id);
            const updatedProducts = products.filter((prod) => prod.productID != id);
            Cart.deleteFromCart(id, item.prise)
            fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static fetchById(id, callback) {
        getProductsFromFile((products) => {
            const product = products.find((prod) => prod.productID == id);
            callback(product);
        });
    }
};
