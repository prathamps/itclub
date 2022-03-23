const mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: { type: String, unique: true, required: true },
	password: String,
	email: { type: String, unique: true, required: true },
	team: { type: String, default: "Solo" },
	joindate: String,
	status: { type: String, default: "visitor" },
	score: { type: Number, default: 0 },
	playtime: { type: Number, default: 0 },
	geekcoins: { type: Number, default: 0 },
	gamecount: { type: Number, default: 0 },
	online: { type: Boolean, default: true },
	recentlyPlayed: [
		{
			type: String,
			default: "none",
		},
	],
	playerLevels: {
		levels: {
			type: Number,
			default: 0,
		},
		exp: {
			type: Number,
			default: 0,
		},
	},
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
