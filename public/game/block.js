function init() {
	let btn = document.querySelector(".submit-btn");
	let option_head = document.querySelector(".option-header");
	let option = 0;
	let drake = dragula(
		[document.getElementById("options"), document.getElementById("question")],
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
				else return target.id == "question" ? false : true;
			},
			revertOnSpill: true,
			mirrorContainer: document.body,
		}
	);

	drake.on("drop", (e1, target, source, sibling) => {
		if (target.id == "question") {
			console.log(btn);
			option_head.innerHTML = "<button class=\"submit-btn\">Submit</button>";
			if (e1.id === "optionOne") {
				console.log("Yay... Correct answer");
			}
		}
	});
}
