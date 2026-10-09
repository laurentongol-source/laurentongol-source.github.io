//Navigation bar dropdown

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".startDROPDOWN");
  const dropdownBtn = document.querySelector(".startBTN");

  // Toggle the menu when the button is clicked
  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevents the document click listener from instantly closing it
    dropdown.classList.toggle("active");
  });

  // Close the menu automatically if the user clicks anywhere else outside of it
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});



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
    category: "Grian's Team"
  },
   {
    question: "who is not in GIGGS team?",
    options: ["Impulse", "Grian", "Scott", "GeminiTay"],
    answer: "Scott",
    category: "Grian's Team"
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
correctSound.preload = "auto";
const incorrectSound = new Audio("wrong.mp3");
incorrectSound.preload = "auto";

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
  const chartCanvas = document.getElementById("result-chart");
  if (!chartCanvas) return;

  const ctx = chartCanvas.getContext("2d");
  const labels = Object.keys(categoryTotals);
  const accuracy = labels.map(tot => {
    return (categoryScores[tot] / categoryTotals[tot]) * 100;
  });

  // Global Chart.js typography configuration to match your site
  Chart.defaults.font.family = "'Courier New', Courier, monospace";
  Chart.defaults.font.weight = "bold";
  Chart.defaults.color = "#ffffff"; // White text for axis data tags

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Category Accuracy (%)",
        data: accuracy,
        backgroundColor: "rgba(169, 210, 220, 0.7)", // #A9D2DC with soft transparency
        borderColor: "#23303d",                      // Deep Slate Blue borders
        borderWidth: 2,
        borderRadius: 8,                             // Rounded bars to match UI elements
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#ffffff', // Ensures the top legend label is readable
            font: { size: 14 }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)" // Soft grid line indicators
          },
          ticks: {
            color: "#ffffff",
            font: { size: 14 }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: "rgba(255, 255, 255, 0.1)"
          },
          ticks: {
            color: "#ffffff",
            font: { size: 14 }
          },
          title: {
            display: true,
            text: "Accuracy (%)",
            color: "#e8fdfe", // Light aqua color tag highlight
            font: {
              size: 16
            }
          }
        }
      }
    }
  });
}


function showResult() {
  const percentage = Math.round((score / quizData.length) * 100);

  document.getElementById("score-text").innerText = `Your overall score: ${percentage}% (${score}/${quizData.length})`;

  // Toggle layout states
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  // Build the graph inside the permanent canvas element
  setTimeout(() => {
    generateCategoryChart();
  }, 50);
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
