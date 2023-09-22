"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Tweet extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Tweet.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			quoteTweetId: {
				type: DataTypes.INTEGER,
			},
			content: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 255],
					notEmpty: true,
				},
			},
		},
		{
			sequelize,
			modelName: "Tweet",
		}
	);
	return Tweet;
};
