const express = require("express");
const { Tweet, User } = require("../../db/models");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();

router.get("/", async (req, res) => {
	const allTweets = await Tweet.findAll({
		include: [
			{
				model: Tweet,
				required: false,
				include: { model: User },
				order: [["createdAt", "ASC"]],
			},
			{ model: User },
		],
		order: [["createdAt", "ASC"]],
	});
	res.json(allTweets);
});

router.get("/:tweetId", async (req, res) => {
	const { tweetId } = req.params;

	const tweet = await Tweet.findByPk(tweetId, {
		include: [
			{
				model: Tweet,
				required: false,
				include: { model: User },
				order: [["createdAt", "DESC"]],
			},
			{ model: User },
		],
		order: [["createdAt", "DESC"]],
	});

	res.json(tweet);
});

const validateTweet = [
	check("body")
		.exists({ checkFalsy: true })
		.isLength({ min: 0, max: 255 })
		.withMessage("Tweet must be between 1 and 255 characters"),
	handleValidationErrors,
];

router.post("/", validateTweet, requireAuth, async (req, res) => {
	const { body, replyId } = req.body;
	const { id } = req.user;

	const tweet = await Tweet.create({
		userId: id,
		body,
		replyId,
	});

	const eagerTweet = await Tweet.findByPk(tweet.id, {
		include: { model: User }
	})

	res.json(eagerTweet);
});

router.put("/:tweetId", requireAuth, validateTweet, async (req, res) => {
	const { body } = req.body;
	const { id } = req.user;
	const { tweetId } = req.params;

	const tweet = await Tweet.findByPk(tweetId);

	if (tweet.userId === id) {
		tweet.body = body;
		await tweet.save();
		return res.json(tweet);
	} else {
		res.status = 403;
	}
});

router.delete("/:tweetId", requireAuth, async (req, res) => {
	const { tweetId } = req.params;

	const tweet = await Tweet.findByPk(tweetId);

	await tweet.destroy();

	res.json({ message: "Tweet deleted" });
});

module.exports = router;
