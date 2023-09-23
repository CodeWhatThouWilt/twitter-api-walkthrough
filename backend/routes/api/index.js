const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const tweetsRouter = require("./tweets.js");

router.use("/session", sessionRouter); // /api/session
router.use("/users", usersRouter); // /api/users
router.use("/tweets", tweetsRouter); // /api/tweets

module.exports = router;
