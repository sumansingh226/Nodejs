const bcrypt = require('bcryptjs');
const User = require("../../models/graphlqlUser");

const resolvers = {
    hello() {
        return {
            text: "Hello World!",
            views: 1234
        };
    },
    addUser: async ({ userInput }) => {
        const { email, name, password } = userInput;

        if (!email || !name || !password) {
            throw new Error("All fields (email, name, password) are required!");
        }
        console.log("email", email);
        const existingUser = await User.findOne({
            email
        })
        if (existingUser) {
            throw new Error("User with this email already exists!");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        if (!hashedPassword) {
            throw new Error("Password hashing failed. Try again later.");
        }

        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            status: 'Active',
            posts: []
        });

        try {
            const savedUser = await newUser.save();
            return { ...savedUser._doc, _id: savedUser._id.toString() };
        } catch (err) {
            throw new Error("User creation failed due to a database issue: " + err.message);
        }
    }
};

module.exports = resolvers;
