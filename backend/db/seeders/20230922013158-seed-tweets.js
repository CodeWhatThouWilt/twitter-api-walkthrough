"use strict";

const { Tweet } = require("../models");
const { Op } = require("sequelize");

const tweets = [
	{
		userId: 1,
		content: "This is my first tweet!",
	},
	{
		userId: 2,
		content: "Dood I'm the second person to sign up",
	},
	{
		userId: 3,
		content: "Better watch it for shmake",
	},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Tweet.bulkCreate(tweets, { validate: true });
	},

	async down(queryInterface, Sequelize) {
		for (const tweet of tweets) {
			await queryInterface.bulkDelete(
				"Tweets",
				{
					content: tweet.content,
					userId: tweet.userId,
				},
				{}
			);
		}
	},
};
