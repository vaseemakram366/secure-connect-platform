
const mongoose = require("mongoose");
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri || uri.includes("YOUR_") || uri.includes("xxxxx")) {
            throw new Error("MONGO_URI is missing or contains a placeholder");
        }

        await mongoose.connect(uri);

        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
