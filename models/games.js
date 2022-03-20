var mongoose = require("mongoose");

//Schema Setup
var gamesSchema = new mongoose.Schema({
	name: String,
	image: String,
	descrption: String,
	difficulty: { type: Number, default: 0 },
	maxscore: { type: Number, default: 0 },
});

module.exports = mongoose.model("gameChoices", gamesSchema);
