var mongoose = require("mongoose");

//Schema Setup
var gamesSchema = new mongoose.Schema({
	name: String,
	image: String,
	descrption: String,
	players: [
		{
			username: { type: Number, default: 0 },
			score: [{ type: Number, default: 0 }],
			highscore: { type: Number, default: 0 },
		},
	],
});

module.exports = mongoose.model("gameChoices", gamesSchema);
