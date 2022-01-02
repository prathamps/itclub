function init() {
	var option = 0;
	var drake = dragula(
		[document.getElementById("to-do"), document.getElementById("doing")],
		{
			moves: function (el, source, handle, sibling) {
				return el.classList[1] === "question-code" ? false : true;
			},
			accepts: function (el, target, source, sibling) {
				if (sibling)
					return sibling.classList[1] === "question-code" &&
						sibling.classList[2] !== "end-block"
						? false
						: true;
				else return target.id == "doing" ? false : true;
			},
			revertOnSpill: true,
			mirrorContainer: document.body,
		}
	);

	drake.on("drop", (e1, target, source, sibling) => {
		if (target.id == "doing") {
			if (e1.id === "optionOne") {
				console.log("Yay... Correct answer");
			}
		}
	});
}
