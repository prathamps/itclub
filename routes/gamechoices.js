const express = require("express"),
	router = express.Router(),
	User = require("../models/user.js"),
	middleware = require("../middleware");

//Snake Game
router.get("/tatakaesnake", (req, res) => {
	res.render("./games/snakegame", { title: "TatakaeSnake" });
});

//Block Snippets
router.get("/snapthatcode", (req, res) => {
	res.render("./games/blocksnippets", { title: "SnapThatCode" });
});

module.exports = router;
