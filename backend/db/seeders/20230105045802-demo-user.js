"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					email: "yake@gmail.com",
					username: "yake",
					hashedPassword: bcrypt.hashSync("password"),
				},
				{
					email: "user1@user.io",
					username: "FakeUser1",
					hashedPassword: bcrypt.hashSync("password2"),
				},
				{
					email: "user2@user.io",
					username: "FakeUser2",
					hashedPassword: bcrypt.hashSync("password3"),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		const Op = Sequelize.Op;
		await queryInterface.bulkDelete(
			"Users",
			{
				username: {
					[Op.in]: ["yake", "FakeUser1", "FakeUser2"],
				},
			},
			{}
		);
	},
};
