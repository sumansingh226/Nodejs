const fs = require("fs");
const path = require("path");

const filePath = path.join(path.dirname(process.mainModule.filename), "data", "cart.json");
module.exports = class Cart {
    static addToCart(id, productPrize) {
        fs.readFile(filePath, (err, file) => {
            let cart = { products: [], totalPrize: 0 };
            if (!err) {
                cart = JSON.parse(file) ?? [];
            }
            const existingProductIndex = cart.products.findIndex(
                (prod) => prod.productID == id
            );

            const existingProduct = cart.products.find[existingProductIndex];

            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { productID: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrize = cart.totalPrize + productPrize;
            fs.writeFile(filePath, JSON.stringify(cart.products), (err) => {
                console.log(err);
            });
        });
    }
};
