const mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	email: { type: String, unique: true, required: true },
	team: { type: String, default: "Solo" },
	joindate: String,
	status: { type: String, default: "visitor" },
	score: { type: Number, default: 0 },
	playtime: { type: Number, default: 0 },
	gamecount: { type: Number, default: 0 },
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
