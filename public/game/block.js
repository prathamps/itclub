const questions = [
	{
		questionTitle: `Program to find the fibonnaci sequence of first n numbers`,
		question: `#include &ltstdio.h&gt
		int main() {
										
		int i, n;
							   
		int t1 = 0, t2 = 1;
		int nextTerm = t1 + t2;        
			
		printf("Enter the number of terms: ");
		scanf("%d", &n);                        
		printf("Fibonacci Series: %d, %d, ", t1, t2);`,
		option1: `for (i = 3; i &lt= n; ++i) {
			printf("%d, ", nextTerm);
			t1 = t2;
			t2 = nextTerm;
			nextTerm = t1 + t2;
		}`,
		option2: `for (i = 3; i &gt= n; ++i) {
			printf("%d, ", nextTerm);
			t1 = t2;
			t2 = nextTerm;
			nextTerm = t1 + t2;
		}`,
		option3: `for (i = 3; i &gt= n; ++i) {
			printf("%d, ", nextTerm);
			t1 = t2;
			t2 = nextTerm;
			nextTerm = t1 - t2;
		}`,
		answer: 1,
	},
	{
		questionTitle: `Program to find the factorial of the number`,
		question: `#include &ltstdio.h&gt
		int main() {
										
		int i, n;
							   
		int fact=1;   
			
		printf("Enter the number the value of n: ");
		scanf("%d", &n);`,
		option1: `for (i = 1; i &lt= n; i++) {
			fact = fact * 1;
		}`,
		option2: `for (i = 1; i &gt= n; i++) {
			fact = fact * i;
		}`,
		option3: `for (i = 1; i &lt= n; i++) {
			fact = fact * i;	
		}`,
		answer: 3,
	},
	{
		questionTitle: `Program to find the nth power of a 2`,
		question: `#include &ltstdio.h&gt
		int main() {
										
		int i, n;
							   
		int ans = 1;   
			
		printf("Enter the number the value of n: ");
		scanf("%d", &n);`,
		option1: `for (i = 1; i &lt= n; i++) {
			ans *= 2;
		}`,
		option2: `for (i = 1; i &gt= n; i++) {
			ans *= 2;
		}`,
		option3: `for (i = 1; i &gt= n; i++) {
			ans *= i;
		}`,
		answer: 2,
	},
	{
		questionTitle: `Program to find to display numbers from 1 - n`,
		question: `#include &ltstdio.h&gt
		int main() {
										
		int i, n;
							      

		printf("Enter the number the value of n: ");
		scanf("%d", &n);`,
		option1: `for (i = 1; i &lt= n; i++) {
			printf("%d", i);
		}`,
		option2: `for (i = 1; i &lt= n; i++) {
			printf("%d", n);
		}`,
		option3: `for (i = 1; i &lt= n; i--) {
			printf("%d", i);	
		}`,
		answer: 1,
	},
]
let number = 1
let flag = 0
let score = 0
let option = 0
let selectedNumber = 0
function init() {
	let option_head = document.querySelector(".option-header")
	changeQuestion()
	let drake = dragula(
		[document.getElementById("options"), document.getElementById("question")],
		{
			moves: function (el, source, handle, sibling) {
				return el.classList[1] === "question-code" ? false : true
			},
			accepts: function (el, target, source, sibling) {
				if (sibling)
					return sibling.classList[1] === "question-code" &&
						sibling.classList[2] !== "end-block"
						? false
						: true
				else return target.id == "question" ? false : true
			},
			revertOnSpill: true,
			mirrorContainer: document.body,
		}
	)

	drake.on("drop", (e1, target, source, sibling) => {
		if (target.id == "question") {
			option_head.innerHTML =
				'<button onclick="check_answer()" class="submit-btn">Submit</button>'
			if (e1.id === "optionOne") {
				option = 1
			} else if (e1.id === "optionTwo") {
				option = 2
			} else if (e1.id === "optionThree") {
				option = 3
			}
		} else if (target.id == "options") {
			option_head.innerHTML = "<h4>Options</h4>"
		}
	})
}

function check_answer() {
	let question_head_conatiner = document.getElementById("questionHeadContainer")
	let question_head = document.querySelector(".question-head")
	if ((number <= 4) & (selectedNumber < 4)) {
		console.log(question_head_conatiner)
		if (questions[selectedNumber].answer === option) {
			question_head.innerText = "Correct Answer!!"
			question_head_conatiner.style.backgroundColor = "#2b9c43"
			score += 20
		} else {
			question_head_conatiner.style.backgroundColor = "red"
			question_head.innerText = "Wrong Answer!! "
		}
		number += 1
		selectedNumber += 1
		if (flag == 0) {
			setTimeout(() => {
				changeQuestion()
				question_head_conatiner.style.backgroundColor = "#ff872f"
			}, 1000)
			changeQuestion()
		}
		return
	}

	submitScores()
}

function changeQuestion() {
	if (number > 4) return
	let questionblock = document.getElementById("questionHead")
	questionblock.innerHTML = questions[selectedNumber].questionTitle
	let codeblock = document.getElementById("CODE")
	codeblock.innerHTML = questions[selectedNumber].question

	let option1 = document.getElementById("Option1")
	option1.innerHTML = questions[selectedNumber].option1

	let option2 = document.getElementById("Option2")
	option2.innerHTML = questions[selectedNumber].option2

	let option3 = document.getElementById("Option3")
	option3.innerHTML = questions[selectedNumber].option3
}

function submitScores() {
	console.log(score)
	game_over_screen = document.getElementById("gameOver")
	game_over_screen.style.visibility = "inherit"
	document.getElementById("game-over-score").value = score
	flag = 1
}
