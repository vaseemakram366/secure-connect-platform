const jwt = require("jsonwebtoken");
const eventEmitter = require("../utils/eventEmitter");

module.exports = (io) => {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("Authentication token required"));
        }

        try {
            socket.user = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (error) {
            next(new Error("Invalid or expired token"));
        }
    });

    io.on("connection", (socket) => {
        console.log("User Connected:", socket.id);
        eventEmitter.emit("user:connected", socket.user.id);

        socket.on("chat:message", (message) => {
            const payload = {
                senderId: socket.user.id,
                message,
                sentAt: new Date()
            };
            io.emit("chat:message", payload);
            eventEmitter.emit("chat:message", payload);
        });

        socket.on("disconnect", () => {
            console.log("User Disconnected:", socket.id);
            eventEmitter.emit("user:disconnected", socket.user.id);
        });
    });
};
