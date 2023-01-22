const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const tweetRouter = require("./tweets.js");

router.use("/session", sessionRouter);
router.use("/tweets", tweetRouter);
router.use("/users", usersRouter);

module.exports = router;
