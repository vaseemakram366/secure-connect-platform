
require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const initializeChat = require("./sockets/chat");
const eventEmitter = require("./utils/eventEmitter");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Secure Connect Platform API is Running"
    });
});

eventEmitter.on("chat:message", (payload) => {
    console.log("Chat message:", payload.message);
});

initializeChat(io);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
