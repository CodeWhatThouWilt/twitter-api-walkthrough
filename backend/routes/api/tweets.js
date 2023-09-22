const router = require("express").Router();
const { requireAuth } = require("../../utils/auth.js");

const { Tweet } = require("../../db/models");

router.get("/", async (req, res) => {
	const tweets = await Tweet.findAll();

	return res.json({ tweets });
});

router.post("/", requireAuth, async (req, res) => {
	const { content } = req.body;
	const userId = req.user.id;

	const newTweet = await Tweet.create({
		userId,
		content,
	});

	return res.json(newTweet);
});

router.get("/current", async (req, res) => {
	const userId = req.user.id;

	const tweets = await Tweet.findAll({
		where: {
			userId,
		},
	});

	return res.json(tweets);
});

router.get("/:tweetId", async (req, res, next) => {
	const { tweetId } = req.params;

	const tweet = await Tweet.findByPk(tweetId);

	if (!tweet) {
		const err = new Error();
		err.status = 404;
		err.message = "Not found";
		err.title = "Not found";
		return next(err);
	}

	return res.json(tweet);
});

router.put("/:tweetId", async (req, res, next) => {
	const { tweetId } = req.params;
	const { content } = req.body;
	const userId = req.user.id;

	const editedTweet = await Tweet.findByPk(tweetId);

	if (!editedTweet) {
		const err = new Error();
		err.status = 404;
		err.message = "Not found";
		err.title = "Not found";
		return next(err);
	}

	if (userId !== editedTweet.userId) {
		const err = new Error();
		err.status = 304;
		err.message = "Unauthorized";
		err.title = "Unauthorized";
		return next(err);
	}

	editedTweet.content = content;
	await editedTweet.save();

	return res.json(editedTweet);
});

module.exports = router;
