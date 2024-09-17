const resolvers = {
    hello() {
        return {
            text: "Hello World!",
            views: 1234 // Fixed typo here
        };
    }
};

module.exports = resolvers;
