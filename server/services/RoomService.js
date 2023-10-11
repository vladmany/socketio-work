const {Room} = require("../models/init");
const {Op} = require("sequelize");

module.exports = {
	async getRooms(userId) {
		try {
			return await Room.findAll({
				where: {
					[Op.or]: [
						{ is_private: null },
						{
							is_private: true,
							[Op.or]: [
								{requester_id: userId},
								{responder_id: userId}
							]
						}
					]
				}
			});
		} catch (e) {
			throw e;
		}
	},
	async createRoom(name, isPrivate = null, requesterId = null, responderId = null) {
		try {
			return await Room.create({
				name,
				is_private: isPrivate,
				requester_id: requesterId,
				responder_id: responderId,
			});
		} catch (e) {
			throw e;
		}
	}
}