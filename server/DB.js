const { Sequelize } = require('sequelize');
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'mysql',
});

module.exports = sequelize;