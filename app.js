const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
//load static assests
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//HOME Route

app.get("/", (req, res) => {
	res.render("landing", { title: "Transponster" });
});

//Menu Page
app.get("/worldofchoice", (req, res) => {
	res.render("./menu/choicemenu", { title: "IChooseYou" });
});

//Snake Game
app.get("/tatakaesnake", (req, res) => {
	res.render("./games/snakegame", { title: "TatakaeSnake" });
});

//Snake Game
app.get("/snapthatcode", (req, res) => {
	res.render("./games/blocksnippets", { title: "SnapThatCode" });
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`New Connection formed on ${port}`);
});
