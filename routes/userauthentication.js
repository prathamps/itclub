const express = require("express"),
	router = express.Router(),
	passport = require("passport"),
	User = require("../models/user.js");
//Authentication Routes

//Register Routes
//Show register form
router.get("/register", (req, res) => {
	res.render("userAuth/register", { title: "Register" });
});

//handle signUp logic
router.post("/register", (req, res) => {
	// try {
	// 	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	// } catch (e) {
	// 	console.log(e);
	// }
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, "0");
	let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	let yyyy = today.getFullYear();

	var newUser = new User({
		username: req.body.username,
		email: req.body.email,
		joindate: today,
	});
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			req.flash("error", err.message);
			res.redirect("/register");
			//return res.render("userAuth/register", { title: "Register" });
		}
		passport.authenticate("local")(req, res, () => {
			console.log(user);
			req.flash("success", "Welcome " + user.username + ". Now go play!! :)");
			res.redirect(`/${user.username}/dashboard`);
		});
	});
});

//Login Router
//view login form
router.get("/login", (req, res) => {
	res.render("userAuth/login", { title: "Login" });
});

//handle loging logic
router.post(
	"/login",
	passport.authenticate("local", { failureRedirect: "/login" }),
	(req, res) => {
		let statusChange = req.user;
		statusChange.online = true;
		User.findByIdAndUpdate(req.user.id, statusChange, (err, foundUser) => {
			if (err) return res.redirect("/login");
			res.redirect(`/${req.user.username}/dashboard`);
		});
	}
);

//LOGOUT Routes
router.get("/logout", (req, res) => {
	let statusChange = req.user;
	statusChange.online = false;
	User.findByIdAndUpdate(req.user.id, statusChange, (err, foundUser) => {
		req.logout();
		req.flash("success", "Logged you out!");
		res.redirect("/");
	});
});

module.exports = router;
