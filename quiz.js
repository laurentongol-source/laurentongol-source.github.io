// List of Questions

const quizData = [
  {
    question: "Is this a Question?",
    options: ["No", "Yes"],
    answer: "Yes",
    category: "General"
  },
  {
    question: "Which of these is NOT a fundamental of Character Design?",
    options: ["Style and Tone", "Shape Language", "Story", "Star Quality"],
    answer: "Star Quality",
    category: "Character Design"
  },
  {
    question: "Who is the man in the chicken costume",
    options: ["Gyran", "Grian", "Ariana Griande", "Yeah_Jaron"],
    answer: "Yeah_Jaron",
    category: "General"
  },
   {
    question: "who is not in GIGGS team?",
    options: ["Impulse", "Grian", "Scott", "GeminiTay"],
    answer: "Scott",
    category: "General"
  },
];

// ELEMENTS
const quizContainer = document.getElementById("quiz"); 
const resultContainer = document.getElementById("result-container"); 
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit"); 

// VARIABLES
let currentQuestion = 0;
let score = 0;
let selectedOption = null; 
const correctSound = new Audio("correct.mp3");
const incorrectSound = new Audio("wrong.mp3");

const categoryScores = {};
const categoryTotals = {};

quizData.forEach(item => {
  if (!categoryScores[item.category]) {
    categoryScores[item.category] = 0;
    categoryTotals[item.category] = 0;
  }
  categoryTotals[item.category]++;
});

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
    categoryScores[quizData[currentQuestion].category]++;
    selectedButton.classList.add("correct");

    correctSound.currentTime = 0;
    correctSound.play(); 
  }
// if answer == incorrect; show correct answer;  
else {
    selectedButton.classList.add("incorrect");
    highlightCorrectAnswer(correctAnswer);

    incorrectSound.currentTime = 0;
    incorrectSound.play();
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

function generateCategoryChart() {
  const ctw = document.getElementById("result-chart").getContext("2d");
  const labels = Object.keys(categoryTotals);
  const accuracy = labels.map(tot => {
    return (categoryScores[tot] / categoryTotals[tot]) * 100;
  });

  new Chart(ctw, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Category Accuracy (%)",
        data: accuracy,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: "Accuracy (%)"}
        }
      }
    }
  });
}

function showResult() {
  const percentage = Math.round((score / quizData.length) * 100);

  const canvasHTML = `<div style="max-width: 500px; margin: 20px auto;"><canvas id="result-chart"></canvas></div>`;

  const summaryHTML = `
    <h1>Quiz Completed!</h1>
    <p>Your overall score: ${percentage}% (${score}/${quizData.length})</p>
      <button onclick="location.reload()">Restart Quiz</button>
      ${canvasHTML}
  `;

  resultContainer.innerHTML = summaryHTML;

  quizContainer.style.display = "none";
  resultContainer.style.display = "block";


  generateCategoryChart();

}

// when 'NEXT' button clicked, add to question counter
  // run [showResult] function if no questions left
submitButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion === quizData.length) {
    showResult();
  } else {
     showQuestion();
  }
});


// Start Quiz
showQuestion();
