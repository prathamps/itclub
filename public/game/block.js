function init() {
	let btn = document.querySelector(".submit-btn");
	let codeblock = document.getElementById("CODE");
	codeblock.innerHTML = `#include &ltstdio.h&gt
int main() {
								
int i, n;
					   
int t1 = 0, t2 = 1;
int nextTerm = t1 + t2;        
	
printf("Enter the number of terms: ");
scanf("%d", &n);                        
printf("Fibonacci Series: %d, %d, ", t1, t2);    `;

	let option1 = document.getElementById("Option1");
	option1.innerHTML = `for (i = 3; i &lt= n; ++i) {
		printf("%d, ", nextTerm);
		t1 = t2;
		t2 = nextTerm;
		nextTerm = t1 + t2;
	}`;
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
			option_head.innerHTML = '<button class="submit-btn">Submit</button>';
			if (e1.id === "optionOne") {
				console.log("Yay... Correct answer");
			}
		}
	});
}
