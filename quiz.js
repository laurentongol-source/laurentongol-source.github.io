// List of Questions

const quizData = [
  {
    question: "Is this a Question?",
    options: ["No", "Yes"],
    answer: "Yes"
  },
  {
    question: "Which of these is NOT a fundamental of Character Design?",
    options: ["Style and Tone", "Shape Language", "Story", "Star Quality"],
    answer: "Star Quality"
  },
  {
    question: "Who is the man in the chicken costume",
    options: ["Gyran", "Grian", "Ariana Griande", "Yeah_Jaron"],
    answer: "Yeah_Jaron"
  }
];

// ELEMENTS
const quizContainer = document.getElementById("quiz"); 
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit"); 

// VARIABLES
let currentQuestion = 0;
let score = 0;
let selectedOption = null; 

// SHOW question on page ; assign evident question with [currentQuestion]
function showQuestion() {
  const question = quizData[currentQuestion];
  questionElement.innerText = question.question;
  
// If no option selected, no action
  optionsElement.innerHTML = "";
  selectedOption = null; 

// Hide 'Submit'/'Next' button until [selectedOption] =/= null
  submitButton.style.display = "none"; 

// Create a button for each option in a question:, onClick assign as selectAnswer
  question.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option-btn");
    optionsElement.appendChild(button);
    button.addEventListener("click", (e) => selectAnswer(e, option));
  });
}

// when [selectAnser] chosen; stop User from changing answer
function selectAnswer(e, optionText) {
  if (selectedOption !== null) return; 

// check if [selectedOption] == Correct Answer
  selectedOption = optionText;
  const selectedButton = e.target;
  const correctAnswer = quizData[currentQuestion].answer;

// if answer == correct; assign question as correct & +1 score;
  if (optionText === correctAnswer) {
    score++;
    selectedButton.classList.add("correct");
  }
// if answer == incorrect; show correct answer;  
else {
    selectedButton.classList.add("incorrect");
    highlightCorrectAnswer(correctAnswer);
  }
  
// when question answered, display 'NEXT' question Button
  // when there are none left, display 'FINISH QUIZ' button
  submitButton.style.display = "block";
  submitButton.innerText = currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next Question";
}

function highlightCorrectAnswer(correctAnswer) {
  const buttons = optionsElement.querySelectorAll("button");
  buttons.forEach(button => {
    if (button.innerText === correctAnswer) {
      button.classList.add("correct");
    }
  });
}

function showResult() {
  quizContainer.innerHTML = `
    <h1>Quiz Completed!</h1>
    <p>Your score: ${score}/${quizData.length}</p>
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}

// when 'NEXT' button clicked, add to question counter
  // run [showResult] function if no questions left
submitButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});


// Start Quiz
showQuestion();
