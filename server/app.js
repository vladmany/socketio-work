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

const chatHistory = [
	{from: 'user111', text: 'Привет, чаттеры!!'},
	{from: 'vitalik228', text: 'ну привет'},

];
io.on("connection", (socket) => {
	sendMessage('SERVER', `Поприветствуем нового участника чата - ${socket.handshake.query.nickname}`);
	socket.emit('connected', {chatHistory});

	socket.on('message', (args) => {
		sendMessage(args.from, args.text);
	});

	function sendMessage(from, text) {
		chatHistory.push({from, text});
		io.emit('message', {from, text});
	}
});

setTimeout(() => io.emit('msg', 'Welcome to the my server!'), 3000)

httpServer.listen(3000);