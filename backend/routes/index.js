const express = require("express");
const router = express.Router();
const apiRouter = require("./api");
const { restoreUser } = require("../utils/auth.js");

router.use(restoreUser);

if (process.env.NODE_ENV !== "production") {
	router.get("/api/csrf/restore", (req, res) => {
		res.cookie("XSRF-TOKEN", req.csrfToken());
		return res.json({});
	});
}

router.use("/api", apiRouter);

module.exports = router;
