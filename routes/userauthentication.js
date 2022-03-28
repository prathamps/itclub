const express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user.js"),
	LocalStartegy = require("passport-local").Strategy;
//Authentication Routes

//Register Routes
//Show register form
router.get("/register", (req, res) => {
	res.render("userAuth/register", { title: "Register" });
});

//handle signUp logic
router.post("/register", (req, res) => {
	let today = new Date();

	var newUser = new User({
		username: req.body.username,
		email: req.body.email,
		joindate: today,
	});
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			// console.log(err);
			req.flash("error", err.message);
			res.redirect("/register");
			//return res.render("userAuth/register", { title: "Register" });
		}
		passport.authenticate("local")(req, res, () => {
			// console.log(user);
			req.flash("success", "Welcome " + user.username + ". Now go play!! :)");
			res.redirect(`/${user.username}/dashboard`);
		});
	});
});

//Login Router
//view login form
router.get("/login", (req, res) => {
	return res.render("userAuth/login", {
		title: "Login",
		user: req.isAuthenticated() ? req.user : null,
	});
});

//handle loging logic
router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/login",
		failureMessage: true,
		failureFlash: true,
	}),
	(req, res) => {
		let statusChange = req.user;
		statusChange.online = true;
		User.findByIdAndUpdate(req.user.id, statusChange, (err, foundUser) => {
			console.log(err);
			if (err) {
				return res.redirect("/login");
			}
			res.redirect(`/${req.user.username}/dashboard`);
		});
	}
);

//LOGOUT Routes
router.get("/logout", (req, res) => {
	let statusChange = req.user;
	statusChange.online = false;
	statusChange.visted += 1;
	User.findByIdAndUpdate(req.user.id, statusChange, (err, foundUser) => {
		req.logout();
		req.flash("success", "Logged you out!");
		res.redirect("/");
	});
});

module.exports = router;
