const {ChatMessage, User} = require("../models/init");
module.exports = {
	async getMessages(roomId) {
		try {
			return await ChatMessage.findAll({
				include: User,
				where: {room_id: roomId}
			});
		} catch (e) {
			throw e;
		}
	},
	async createMessage(message, userId = null, roomId) {
		try {
			const chatMessage = await ChatMessage.create({
				message,
				user_id: userId,
				room_id: roomId,
			});
			await chatMessage.reload({include: User});

			return chatMessage;
		} catch (e) {
			throw e;
		}
	}
}