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
  },
  {
    question: ":D",
    options: ["Gyran", "Grian", "Ariana Griande", "Yeah_Jaron"],
    answer: "Yeah_Jaron"
  },
];

// DOM Elements
const quizContainer = document.getElementById("quiz"); 
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit"); // Your next button

let currentQuestion = 0;
let score = 0;
let selectedOption = null; // Tracks current choice

function showQuestion() {
  const question = quizData[currentQuestion];
  questionElement.innerText = question.question;
  
  optionsElement.innerHTML = "";
  selectedOption = null; 
  
  // Hide the next button until they choose an answer
  submitButton.style.display = "none"; 

  question.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("option-btn");
    optionsElement.appendChild(button);
    button.addEventListener("click", (e) => selectAnswer(e, option));
  });
}

function selectAnswer(e, optionText) {
  // Prevent changing answers after one is already selected
  if (selectedOption !== null) return; 
  
  selectedOption = optionText;
  const selectedButton = e.target;
  const correctAnswer = quizData[currentQuestion].answer;
  
  // Apply visual styling feedback
  if (optionText === correctAnswer) {
    score++;
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("incorrect");
    // Optional: Highlight the correct answer for the user
    highlightCorrectAnswer(correctAnswer);
  }
  
  // Reveal the next button now that an answer is locked in
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

// Event listener for the Next/Submit button
submitButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizContainer.innerHTML = `
    <h1>Quiz Completed!</h1>
    <p>Your score: ${score}/${quizData.length}</p>
    <button onclick="location.reload()">Restart Quiz</button>
  `;
}

// Initialize Quiz
showQuestion();
