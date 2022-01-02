function init() {
	hljs.highlightAll();
	var drake = dragula(
		[document.getElementById("to-do"), document.getElementById("doing")],
		{
			revertOnSpill: true,
			mirrorContainer: document.body,
		}
	);

	drake.on("drop", (e1, target, source, sibling) => {
		if (target.id == "doing") {
			console.log("");
		}
	});
}
