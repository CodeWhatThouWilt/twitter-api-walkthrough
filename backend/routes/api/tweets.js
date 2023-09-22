const router = require("express").Router();

const { Tweet } = require("../../db/models");

router.get("/", async (req, res) => {
	const tweets = await Tweet.findAll();

	return res.json({ tweets });
});

module.exports = router;
