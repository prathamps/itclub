const express = require("express"),
	router = express.Router(),
	User = require("../models/user.js"),
	middleware = require("../middleware");

//Snake Game
router.get("/tatakaesnake", (req, res) => {
	if (!req.isAuthenticated()) return res.redirect("/login");
	res.render("./games/snakegame", {
		title: "TatakaeSnake",
		score: req.user.score,
		id: req.user._id,
	});
});

router.put("/tatakaesnake/:id/updatescore", (req, res) => {
	if (!req.isAuthenticated()) return res.redirect("/login");
	let updUser = req.user;
	updUser.score = req.user.score + parseInt(req.body.score);
	console.log(updUser.score);
	User.findByIdAndUpdate(req.params.id, updUser, (err, updatedPlayerStats) => {
		if (err) {
			res.redirect("back");
		} else {
			res.redirect("/leaderboards");
		}
	});
});

//Block Snippets
router.get("/snapthatcode", (req, res) => {
	if (!req.isAuthenticated()) return res.redirect("/login");
	res.render("./games/blocksnippets", { title: "SnapThatCode" });
});

module.exports = router;
