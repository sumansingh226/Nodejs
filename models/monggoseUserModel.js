const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cart: {
        items: [
            {
                productID: {
                    type: Schema.Types.ObjectId,
                    required: true,
                },
            },
        ],
    },
});

module.exports = mongoose.model("User", UserSchema);
