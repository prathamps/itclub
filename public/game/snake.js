let game_area_width = roundUp(window.innerWidth);
let game_area_outer_width = roundUp(window.outerWidth / 5);
let game_area_outer_height = roundUp(window.outerWidth / 5);
let game_area_height = roundUp(window.innerHeight);
let grid_number = (game_area_width - game_area_outer_width) / 25;
let snake_horizontal = (snake_vertical = 10);
let snake_horizontal_speed = (snake_vertical_speed = 0);
let tile_count = roundUp(grid_number);
let tile_count_horizontal =
	game_area_width > 600
		? (game_area_width - game_area_outer_width) / 25
		: game_area_width / 25;
let tile_count_vertical =
	game_area_width > 600
		? game_area_height / 25
		: (game_area_height - game_area_outer_height) / 25;
tile_count_horizontal = roundUp(tile_count_horizontal);
tile_count_vertical = roundUp(tile_count_vertical);
let grid_size = 25;
let fruit_horizontal_distance = (fruit_vertical_distance = 0);
let snake_trail = [];
let snake_length = 5;
let score_earned = 0;
let time = [];
let counter = 0;
function startGame() {
	start();
}

function roundUp(n) {
	return Math.floor((n / 5) * 5);
}

function start() {
	canvas = document.getElementById("gamearea");
	gamedetails = document.getElementById("gameDetails");
	score = document.getElementById("scoreNumber");
	game_over_screen = document.getElementById("gameOver");
	final_score = document.getElementById("game-over-score");
	final_score.innerHTML = score.innerHTML;
	score_earned = 0;
	game_over_screen.height =
		game_area_width > 600
			? game_area_width - game_area_outer_width
			: game_area_width;
	game_over_screen.width =
		game_area_width > 600
			? game_area_height
			: game_area_height - game_area_outer_height;
	canvas.width =
		game_area_width > 600
			? game_area_width - game_area_outer_width
			: game_area_width;
	canvas.height =
		game_area_width > 600
			? game_area_height
			: game_area_height - game_area_outer_height;
	canvas.fillStyle = "rgb(50, 51, 51)";
	ctx = canvas.getContext("2d");
	document.addEventListener("keydown", keyPush);
	document.addEventListener("touchstart", handleTouchStart, false);
	document.addEventListener("touchmove", handleTouchMove, false);
	CanvasRenderingContext2D.prototype.roundRect = function (
		x,
		y,
		width,
		height,
		radius
	) {
		if (width < 2 * radius) radius = width / 2;
		if (height < 2 * radius) radius = height / 2;
		this.beginPath();
		this.moveTo(x + radius, y);
		this.arcTo(x + width, y, x + width, y + height, radius);
		this.arcTo(x + width, y + height, x, y + height, radius);
		this.arcTo(x, y + height, x, y, radius);
		this.arcTo(x, y, x + width, y, radius);
		this.closePath();
		return this;
	};
	if (game_area_width > 600) {
		gamedetails.style.width = `${window.innerWidth - canvas.width}px`;
		gamedetails.style.height = "100%";
	} else {
		gamedetails.style.height = `${window.innerHeight - canvas.height}px`;
		gamedetails.style.width = "100%";
	}

	score.innerText = "0";
	time.push({
		time: counter,
		score: score_earned,
	});
	setInterval(updateGameArea, 1000 / 15);
}

function updateGameArea() {
	counter += 1;
	time.push({
		time: counter,
		score: score_earned,
	});
	if (counter % 200 == 0) {
		counter = 0;
		time = [];
		time.push({
			time: counter,
			score: score_earned,
		});
	} else {
		if (counter > 2) {
			if (time[counter].score - time[counter - 1].score > 200) score_earned = 0;
		}
	}

	game_area_width = roundUp(window.innerWidth);
	game_area_outer_width = roundUp(window.outerWidth / 5);
	game_area_height = roundUp(window.innerHeight);
	grid_number = roundUp((game_area_width - game_area_outer_width) / 25);
	tile_count_horizontal =
		game_area_width > 600
			? (game_area_width - game_area_outer_width) / 25
			: game_area_width / 25;
	tile_count_vertical =
		game_area_width > 600
			? game_area_height / 25
			: (game_area_height - game_area_outer_height) / 25;
	tile_count_horizontal = roundUp(tile_count_horizontal);
	tile_count_vertical = roundUp(tile_count_vertical);
	snake_horizontal = Math.floor(snake_horizontal);
	snake_vertical = Math.floor(snake_vertical);
	snake_horizontal += snake_horizontal_speed;
	snake_vertical += snake_vertical_speed;
	if (snake_horizontal < 0) {
		snake_horizontal = tile_count_horizontal - 1;
	}
	if (snake_horizontal > tile_count_horizontal - 1) {
		snake_horizontal = 0;
	}
	if (snake_vertical < 0) {
		snake_vertical = tile_count_vertical - 1;
	}
	if (snake_vertical > tile_count_vertical - 1) {
		snake_vertical = 0;
	}

	// Game Over Screen
	game_over_screen.height =
		game_area_width > 600
			? game_area_width - game_area_outer_width
			: game_area_width;
	game_over_screen.width =
		game_area_width > 600
			? game_area_height
			: game_area_height - game_area_outer_height;

	//canvas layout
	canvas.fillStyle = "rgb(50, 51, 51)";
	canvas.width =
		game_area_width > 600
			? game_area_width - game_area_outer_width
			: game_area_width;
	canvas.height =
		game_area_width > 600
			? game_area_height
			: game_area_height - game_area_outer_height;

	if (game_area_width > 600) {
		gamedetails.style.width = `${window.innerWidth - canvas.width}px`;
		gamedetails.style.height = "100%";
	} else {
		gamedetails.style.height = `${window.innerHeight - canvas.height}px`;
		gamedetails.style.width = "100%";
	}

	for (var i = 0; i < snake_trail.length; i++) {
		ctx.roundRect(
			snake_trail[i].x * grid_size,
			snake_trail[i].y * grid_size,
			grid_size - 2,
			grid_size - 2,
			8
		);
		ctx.fillStyle = "rgba(36, 135, 69, 1)";
		ctx.fill();
		if (
			snake_trail[i].x == snake_horizontal &&
			snake_trail[i].y == snake_vertical
		) {
			snake_length = 5;
			score.innerText = score_earned;
			final_score.innerText = score.innerText;
			document.getElementById("game-over-score").value = score_earned;
			if (score_earned != 0) game_over_screen.style.visibility = "inherit";
		}
	}
	snake_trail.push({ x: snake_horizontal, y: snake_vertical });
	while (snake_trail.length > snake_length) {
		snake_trail.shift();
	}
	if (
		fruit_horizontal_distance == snake_horizontal &&
		fruit_vertical_distance == snake_vertical
	) {
		snake_length++;
		score_earned += 20;
		score.innerText = score_earned;
		final_score.innerText = score.innerText;
		tile_count_vertical = roundUp(tile_count_vertical);
		tile_count_horizontal = roundUp(tile_count_horizontal);
		fruit_horizontal_distance_checker = roundUp(
			Math.floor(Math.random() * tile_count_horizontal)
		);
		fruit_horizontal_distance =
			fruit_horizontal_distance_checker > 0
				? fruit_horizontal_distance_checker - 1
				: fruit_horizontal_distance_checker;
		fruit_vertical_distance_checker = roundUp(
			Math.floor(Math.random() * tile_count_vertical)
		);
		fruit_vertical_distance =
			fruit_vertical_distance_checker > 3
				? fruit_vertical_distance_checker - 3
				: fruit_vertical_distance_checker;
	}
	ctx.roundRect(
		fruit_horizontal_distance * grid_size,
		fruit_vertical_distance * grid_size,
		grid_size - 2,
		grid_size - 2,
		8
	);
	ctx.fillStyle = "rgba(255, 0, 20, 0.3)";
	ctx.fill();
}

function keyPush(evt) {
	switch (evt.keyCode) {
		case 37: //left
			if (snake_horizontal_speed != 1) snake_horizontal_speed = -1;
			snake_vertical_speed = 0;
			break;
		case 38: //up
			if (snake_vertical_speed != 1) snake_vertical_speed = -1;
			snake_horizontal_speed = 0;
			break;
		case 39: //right
			if (snake_horizontal_speed != -1) snake_horizontal_speed = 1;
			snake_vertical_speed = 0;
			break;
		case 40: //down
			if (snake_vertical_speed != -1) snake_vertical_speed = 1;
			snake_horizontal_speed = 0;
			break;
	}
}

var xDown = null;
var yDown = null;

function getTouches(evt) {
	return (
		evt.touches || // browser API
		evt.originalEvent.touches
	); // jQuery
}

function handleTouchStart(evt) {
	const firstTouch = getTouches(evt)[0];
	xDown = firstTouch.clientX;
	yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
	if (!xDown || !yDown) {
		return;
	}

	var xUp = evt.touches[0].clientX;
	var yUp = evt.touches[0].clientY;

	var xDiff = xDown - xUp;
	var yDiff = yDown - yUp;

	if (Math.abs(xDiff) > Math.abs(yDiff)) {
		/*most significant*/
		if (xDiff > 0) {
			/* right swipe */
			if (snake_horizontal_speed != 1) snake_horizontal_speed = -1;
			snake_vertical_speed = 0;
		} else {
			/* left swipe */

			if (snake_horizontal_speed != -1) snake_horizontal_speed = 1;
			snake_vertical_speed = 0;
		}
	} else {
		if (yDiff > 0) {
			/* down swipe */
			if (snake_vertical_speed != 1) snake_vertical_speed = -1;
			snake_horizontal_speed = 0;
		} else {
			/* up swipe */

			if (snake_vertical_speed != -1) snake_vertical_speed = 1;
			snake_horizontal_speed = 0;
		}
	}
	/* reset values */
	xDown = null;
	yDown = null;
}
