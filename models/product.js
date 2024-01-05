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
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), (err) =>
                console.log(err)
            );
        });
    }
    static fetchAll() {
        return [];
    }
};
