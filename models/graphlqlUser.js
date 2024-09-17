const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    status: {
        type: String,
        default: 'Active',
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {
    timestamps: true
});

const User = mongoose.model('UserList', userSchema);

module.exports = User;
