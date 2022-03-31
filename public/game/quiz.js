const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
	currentQuestionIndex++;
	setNextQuestion();
});

function startGame() {
	startButton.classList.add("hide");
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	questionContainerElement.classList.remove("hide");
	setNextQuestion();
}

function setNextQuestion() {
	resetState();
	showquestion(shuffledQuestions[currentQuestionIndex]);
}

function showquestion(question) {
	questionElement.innerText = question.question;
	question.answers.forEach((answer) => {
		const button = document.createElement("button");
		button.innerText = answer.text;
		button.classList.add("btn");
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
		answerButtonsElement.appendChild(button);
	});
}

function resetState() {
	clearStatusClass(document.body);
	nextButton.classList.add("hide");
	while (answerButtonsElement.firstChild) {
		answerButtonsElement.removeChild(answerButtonsElement.firstChild);
	}
}

function selectAnswer(e) {
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct;
	setStatusClass(document.body, correct);
	Array.from(answerButtonsElement.children).forEach((button) => {
		setStatusClass(button, button.dataset.correct);
	});
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove("hide");
	} else {
		startButton.innerText = "restart";
		startButton.classList.remove("hide");
	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element);
	if (correct) {
		element.classList.add("correct");
	} else {
		element.classList.add("wrong");
	}
}

function clearStatusClass(element) {
	element.classList.remove("correct");
	element.classList.remove("wrong");
}

const questions = [
	{
		question: `'OS' computer abbreviation usually means?`,
		answers: [
			{ text: "Order of Significance", correct: false },
			{ text: "Open Software", correct: false },
			{ text: "Operating System", correct: true },
			{ text: "Optical Sensor", correct: false },
		],
	},
	{
		question: `'DB' computer abbreviation usually means?`,
		answers: [
			{ text: "Database", correct: true },
			{ text: "Double Byte", correct: false },
			{ text: "Data Block", correct: false },
			{ text: "Driver Boot", correct: false },
		],
	},
	{
		question: "What is a URL",
		answers: [
			{ text: "A computer software program", correct: false },
			{ text: "A type of UFO", correct: false },
			{
				text: "The address of a document or 'page' on the World Wide Web",
				correct: true,
			},
			{ text: "An acronym for uniform Resouces Learning", correct: false },
		],
	},
	{
		question: "Who was the father of computer?",
		answers: [
			{ text: "Charlie Babbage", correct: false },
			{ text: "Dennis Ritchie", correct: false },
			{ text: "Charles Babbage", correct: true },
			{ text: "Ken Thompson", correct: false },
		],
	},
	{
		question: "What is the full form of ALU?",
		answers: [
			{ text: "Arithmetic Logic Unit", correct: true },
			{ text: "Arithmetic Local Unit", correct: false },
			{ text: "Advance Logical Unit", correct: false },
			{ text: "None of these", correct: false },
		],
	},
];
