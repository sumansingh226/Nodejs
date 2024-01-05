const fs = require("fs");
const path = require("path");

module.exports = class Product {
    constructor(productsInformation) {
        this.productsInformation = productsInformation;
    }

    save() {
        const filePath = path.join(
            path.dirname(process.mainModule.filename),
            "data",
            "products.json"
        );
        fs.readFile(filePath, (err, file) => {
            let products = [];
            if (!err) {
                products = JSON.parse(file);
            }
            products.push(this.productsInformation);
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                if (err) {
                    console.error(err);
                }
            });
        });
    }

    static fetchAll() {
        const filePath = path.join(
            path.dirname(process.mainModule.filename),
            "data",
            "products.json"
        );
        fs.readFile(filePath, (err, file) => {
            if (err) {
                return [];
            } else {
                return JSON.parse(file);
            }
        });
    }
};
