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
	moveToChannel(socket, 'general');
	sendMessage('SERVER', `Поприветствуем нового участника чата - ${socket.handshake.query.nickname}`);
	socket.emit('connected', {chatHistory});

	socket.on('message', (args) => {
		const channel = [...socket.rooms][0];

		sendMessage(args.from, args.text, channel);
	});

	socket.on('disconnect', () => {
		sendMessage("SERVER", `${socket.handshake.query.nickname} покинул чат`);
	})

	socket.on('change-channel', (args) => {
		moveToChannel(socket, args.channel);
	})
});

function moveToChannel(socket, channel) {
	socket.leaveAll();
	socket.join(channel)
}

function sendMessage(from, text, channel = 'general') {
	chatHistory.push({from, text});
	io.to(channel).emit('message', {from, text});
}

setTimeout(() => io.emit('msg', 'Welcome to the my server!'), 3000)

httpServer.listen(3000);