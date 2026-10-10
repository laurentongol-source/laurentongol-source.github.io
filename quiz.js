//Navigation bar dropdown

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector(".startDROPDOWN");
  const dropdownBtn = document.querySelector(".startBTN");

  if (dropdown && dropdownBtn) {
    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation(); 
      dropdown.classList.toggle("active");
    });
  }

  document.addEventListener("click", (e) => {
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

//list of the questions
const quizData = [
 {
   question: "Is this a Question?",
   options: ["No", "Yes"],
   answer: "Yes",
   category: "Basics"
 },
 {
   question: "Which of these is NOT a fundamental of Character Design?",
   options: ["Style and Tone", "Shape Language", "Story", "Star Quality"],
   answer: "Star Quality",
   category: "Visuals"
 },
 {
   question: "Who is the man in the chicken costume",
   options: ["Gyran", "Grian", "Ariana Griande", "Yeah_Jaron"],
   answer: "Yeah_Jaron",
   category: "Writing"
 },
 {
   question: "who is not in GIGGS team?",
   options: ["Impulse", "Grian", "Scott", "GeminiTay"],
   answer: "Scott",
   category: "Writing"
 }
];


// ELEMENTS
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");


// variables
let currentQuestion = 0;
let score = 0;


let selectedOption = null;


// AUDIO
const correctSound = new Audio("correct.mp3");
correctSound.preload = "auto";
const incorrectSound = new Audio("wrong.mp3");
incorrectSound.preload = "auto";


// accuracy metrics
const categoryMetrics = {
 "Basics": { correct: 0, incorrect: 0 },
 "Visuals": { correct: 0, incorrect: 0 },
 "Writing": { correct: 0, incorrect: 0 }
};


// creates and displays the question on the screen
function showQuestion() {
 const question = quizData[currentQuestion];
 questionElement.innerText = question.question;
  optionsElement.innerHTML = "";
 selectedOption = null;
 submitButton.style.display = "none";


// create buttons for each option of the question
 question.options.forEach(option => {
   const button = document.createElement("button");
   button.innerText = option;
   button.classList.add("option-btn");
   optionsElement.appendChild(button);


// when user clicks the button, run selectAnswer
   button.addEventListener("click", (e) => selectAnswer(e, option));
 });
}


// when user selected answer prevent them from changing their answer
function selectAnswer(e, optionText) {
 if (selectedOption !== null) return;


// create and assign variable based on their answer
 selectedOption = optionText;
 const selectedButton = e.target;
 const currentItem = quizData[currentQuestion];
 const correctAnswer = currentItem.answer;


// if question is correct, add it to correct answers on cat
// if not, add it to incorrect answers
if (optionText === correctAnswer) {
   score++;
   categoryMetrics[currentItem.category].correct++;    selectedButton.classList.add("correct");


   correctSound.currentTime = 0;
   correctSound.play().catch(err => console.log("Audio play blocked by browser:", err));
 } else {
   categoryMetrics[currentItem.category].incorrect++; // Records incorrect response tracks
   selectedButton.classList.add("incorrect");
   highlightCorrectAnswer(correctAnswer);


   incorrectSound.currentTime = 0;
   incorrectSound.play().catch(err => console.log("Audio play blocked by browser:", err));
 }
  submitButton.style.display = "block";


//only when the quiz runs out of questions, give the user the finish quiz button
 submitButton.innerText = currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next Question";
}
// show the user the correct answer
function highlightCorrectAnswer(correctAnswer) {
 const buttons = optionsElement.querySelectorAll("button");
 buttons.forEach(button => {
   if (button.innerText === correctAnswer) {
     button.classList.add("correct");
   }
 });
}


function showResult() {
 quizContainer.style.display = "none";
 resultContainer.style.display = "block";

// show the user what their overall result is
  const percentage = Math.round((score / quizData.length) * 100);

 resultContainer.innerHTML = `
   <h1>Quiz Completed!</h1>
   <p id="scoreText">Your overall score: ${percentage}% (${score}/${quizData.length})</p>
   <div style="max-width: 500px; margin: 20px auto;">
     <canvas id="quizChart"></canvas>
   </div>
   <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; font-family: 'Courier New'; cursor: pointer;">Restart Quiz</button>
  <button onclick="window.location.href='results.html'" class="quiz-action-btn logs-btn">View All-Time Logs</button>

 `;

   // get the current date and time user did quiz
const attemptDate = new Date().toLocaleString([], {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

// create a profile for every new attemp
const newAttempt = {
  date: attemptDate,
  percentage: percentage,
  correct: score,
  total: quizData.length

}

// fetch the history list ; if doesn't exist, make a new history list
let quizHistory = JSON.parse(localStorage.getItem("quizHistoryLog"));
if (!Array.isArray(quizHistory)) {
  quizHistory = [];
}

// add new attempt profile to the start of the list
quizHistory.unshift(newAttempt)

// add updated list to local storage
localStorage.setItem("quizHistoryLog",JSON.stringify(quizHistory));

 generateCategoryChart();
}

function generateCategoryChart() {
 //create categories ; assign their data that users have got
 const categories = ['Basics', 'Visuals', 'Writing'];
 const correctData = categories.map(cat => categoryMetrics[cat].correct);
 const incorrectData = categories.map(cat => categoryMetrics[cat].incorrect);

// create the graph showing their results in each cat ; display
 const ctx = document.getElementById('quizChart').getContext('2d');
  new Chart(ctx, {
   type: 'bar',
   data: {
     labels: categories,
     datasets: [
       {
         label: 'Correct Answers',
         data: correctData,
         backgroundColor: '#6ea4bf',
         borderWidth: 2,
         borderColor: '#6ea4bf',
         borderRadius: 4
       },
       {
         label: 'Incorrect Answers',
         data: incorrectData,
         backgroundColor: '#23303d',
         borderWidth: 2,
         borderColor: '#23303d',
         borderRadius: 4
       }
     ]
   },
   options: {
     responsive: true,
     plugins: {
       legend: {
         display: true,
         position: 'bottom',
         labels: { 
          color: '#23303d',
          font: { family: 'Courier New', size: 14 } }
       }
     },
     scales: {
       y: {
         beginAtZero: true,
         min: 0,
         suggestedMax: 2, 
         ticks: {
          color: '#23303d',
           stepSize: 1,
           font: { family: 'Courier New', size: 14 }
         }
       },
       x: {
         ticks: {
          color: '#23303d',
 
          font: { family: 'Courier New', size: 14 } }
       }
     }
   }
 });
}


// after user clicks ‘submit’ button ;
  // either display the results ( if ran out of questions ) 
  // or display the next question
submitButton.addEventListener("click", () => {
 currentQuestion++;
 if (currentQuestion === quizData.length) {
   showResult();
 } else {
    showQuestion();
 }
});




// start the quiz
showQuestion();




// have the loading screen be there until all script is loaded

const loadingscreen = document.getElementById("loadingscreen");

// if there is a need for a loading screen, fadeout to the ldscreen 
if(loadingscreen) {
  loadingscreen.classList.add("fade-out");

  setTimeout(() => {
    loadingscreen.remove();
  }, 400);
}

//