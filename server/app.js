require('dotenv').config({});

const express = require("express");
const routes = require('./routes');
const { createServer } = require("http");
const { Server } = require("socket.io");
const { init, Room} = require('./models/init');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const roomService = require("./services/RoomService");
const chatMessageService = require("./services/ChatMessageService");
const { JWT_SECRET } = process.env;
const DEFAULT_ROOM_ID = 1;

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:8080",
	}
});

app.listen(3001, async () => await init());

const sendOnlineTimer = setInterval(() => {
	if (!io)
		clearInterval(sendOnlineTimer);

	const result = {};
	result['all'] = io.engine.clientsCount;

	io.sockets.adapter.rooms.forEach((sockets, room) => {
		result[room] = sockets.size;
	});

	io.emit('set-online', result);
}, 1000);

io.on("connection", async (socket) => {
	const token = socket.handshake.query.token;
	if (!token)
		socket.disconnect();
	socket.data = jwt.verify(token, JWT_SECRET);

	let rooms = await roomService.getRooms(socket.data.id);
	await moveToRoom(socket, DEFAULT_ROOM_ID);
	socket.emit('set-rooms', rooms);

	const roomHistory = await chatMessageService.getMessages(DEFAULT_ROOM_ID);
	socket.emit('set-history', roomHistory);

	socket.on('message', (message) => {
		const room = [...socket.rooms][0];

		sendMessage(message.text, socket.data.id, room);
	});

	socket.on('join-room', async (room) => {
		await moveToRoom(socket, room);
		const history = await chatMessageService.getMessages(room);
		socket.emit('set-history', history);
	});

	socket.on('private-chat-request', (userId) => {
		io.sockets.sockets.forEach(async (userSocket) => {
			const userData = userSocket.data;
			if (userData.id === userId) {
				const selfData = socket.data;
				const roomName = `${selfData.username} & ${userData.username}`;
				const privateRoom = await roomService.createRoom(roomName, true, selfData.id, userData.id);
				moveToRoom(socket, privateRoom.id);
				moveToRoom(userSocket, privateRoom.id);
				socket.emit('private-chat-accept', privateRoom);
				socket.emit('set-history', []);
				userSocket.emit('private-chat-accept', privateRoom);
				userSocket.emit('set-history', []);
			}
		})
	});

});

async function moveToRoom(socket, room) {
	socket.leaveAll();
	socket.join(room);
	socket.emit('joined-room', await Room.findByPk(room));
}

async function sendMessage(text, from = null, roomId = DEFAULT_ROOM_ID)
{
	const message = await chatMessageService.createMessage(text, from, roomId);
	io.to(roomId).emit('message', {message});
}

httpServer.listen(3000);