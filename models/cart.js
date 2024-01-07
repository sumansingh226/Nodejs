const fs = require("fs");
const path = require("path");

const filePath = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
);

module.exports = class Cart {
    static addToCart(id, productPrice) {
        fs.readFile(filePath, (err, file) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(file) || cart;
            }

            const existingProductIndex = cart.products.findIndex(
                (prod) => prod.productID == id
            );

            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].qty += 1;
            } else {
                cart.products.push({ productID: id, qty: 1 });
            }

            cart.totalPrice += +productPrice; // Adding product price to total price

            fs.writeFile(filePath, JSON.stringify(cart), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
};
