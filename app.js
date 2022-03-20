//CONFIG
const express = require("express"),
	app = express(),
	path = require("path"),
	bodyParser = require("body-parser"),
	flash = require("connect-flash"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	LocalStartegy = require("passport-local").Strategy,
	methodOverride = require("method-override"),
	Games = require("./models/games.js"),
	User = require("./models/user.js");

//ROUTES
const gamechoicesRoutes = require("./routes/gamechoices.js"),
	userAuthentication = require("./routes/userauthentication.js");

// const url = "mongodb://localhost:27017";
const url =
	"mongodb+srv://Pratham:hazetoday%402355@aloysius-it-club.8lfvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
try {
	mongoose.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
} catch (e) {
	console.log(e);
}
///check

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//load static assests
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Passport Config
app.use(
	require("express-session")({
		secret: "I am the creator of this universe and humans are puny creatures",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStartegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(userAuthentication);
app.use("/games", gamechoicesRoutes);

//////    Routes

//HOME Route

app.get("/", (req, res) => {
	res.render("landing", { title: "Transponster" });
});

app.get("/leaderboards", (req, res) => {
	if (!req.isAuthenticated()) return res.redirect("/login");
	User.find({}, (err, Users) => {
		if (err) {
			console.log(err);
		} else {
			res.render("games/leaderboards.ejs", {
				title: "Leaderboards",
				users: Users,
				username: req.user.username,
			});
		}
	});
});

app.get("/worldofchoice", (req, res) => {
	res.render("menu/choicemenu.ejs", {
		title: "IChooseYou",
	});
});

app.get("/:id/dashboard", (req, res) => {
	User.find({ username: req.params.id }, (err, foundUser) => {
		if (!req.isAuthenticated()) return res.redirect("/login");
		if (err) {
			return console.log(err);
		}
		if (req.user.username === req.params.id) {
			res.render("menu/dashboard.ejs", {
				title: "Dashboard",
				username: req.user.username,
			});
		}
	});
});

app.get("/groups", (req, res) => {
	if (!req.isAuthenticated()) return res.redirect("/login");
	res.render("menu/groups.ejs", {
		title: "Groups",
		username: req.user.username,
	});
});

app.get("/marketplace", (req, res) => {
	if (!req.isAuthenticated()) return res.redirect("/login");
	res.render("menu/marketplace.ejs", {
		title: "Marketplace",
		username: req.user.username,
	});
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`New Connection formed on ${port}`);
});
