const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:8080",
	}
});

io.on("connection", (socket) => {
});

setTimeout(() => io.emit('msg', 'Welcome to the my server!'), 3000)

httpServer.listen(3000);