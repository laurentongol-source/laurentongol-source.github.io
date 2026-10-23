document.addEventListener("DOMContentLoaded", () => {
    const sound = document.getElementById("click-sound");

    // Select all links and your quiz buttons
    const interactiveElements = document.querySelectorAll(".navbar-RIGHT a, .startCONTENTS a, #quizbtn, button#QUIZ");

    interactiveElements.forEach(element => {
        element.addEventListener("mousedown", () => {
            sound.currentTime = 0;
            sound.play();          
        });
    });
});

function preventAccidentalLeave(e) {
  e.preventDefault();
  const confirmMessage = "Are you sure you want to leave? Your progress will be lost!";
  e.returnValue = confirmMessage
}
window.addEventListener("beforeunload", preventAccidentalLeave);

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
  //The Basics Questions
 {
   question: "Character's are used for...",
   options: ["Books", "Films", "Games", "All of the above"],
   answer: "All of the above",
   category: "Basics"
 },
 {
   question: "What is an alternative name for the supporting cast?",
   options: ["Side Characters", "Backup Characters", "Background Characters", "Chump change"],
   answer: "Side Characters",
   category: "Basics"
 },
 {
   question: "Which of the following is NOT a common use for characters ?",
   options: ["To drive the story forward", "To add more emotion to the story", "To convery themes and morals", "To visually attract an audience"],
   answer: "To visually attract an audience",
   category: "Basics"
 },
 {
   question: "A main character is… ",
   options: ["A character central to the story", "The second most important character", "Just there for the vibes", "The only character that matters"],
   answer: "A character central to the story",
   category: "Basics"
 },

 {
   question: "Stories that only have one character may be seen as : ",
   options: ["Uninteresting", "Fascinating", "Disgusting", "Exciting"],
   answer: "Uninteresting",
   category: "Basics"
 },

 //The Story
 {
   question: "What is one thing you should include in your character’s introduction?",
   options: ["Their problem", "Their Backstory", "Their Future", "Their Quality"],
   answer: "Their problem",
   category: "Writing"
 },

  {
   question: "What makes a character’s story important?",
   options: ["Provides your consumer with insight, information, and interest", "Giving them unnecessary plots makes them good", "To make them the center of the entire universe", "Absolutely nothing"],
   answer: "Provides your consumer with insight, information, and interest",
   category: "Writing"
 },

  {
   question: "Your character’s backstory should include…",
   options: ["Their Dialogue, Their Actions, Their Main Problem", "Magic, Intrigue, and Mystery", "The Untouched, The Events, and the Aftermath", "All of the above"],
   answer: "The Untouched, The Events, and the Aftermath",
   category: "Writing"
 },

  {
   question: "Why shouldn’t you show EVERYTHING about a character?",
   options: ["It’s tacky and unrealistic", "It doesn’t contribute to the plot", "Too many events make it seem bad", "It takes up too much of the story"],
   answer: "It doesn’t contribute to the plot",
   category: "Writing"
 },

  {
   question: "'Write what you know' is… ",
   options: ["Introducing a new character", "Developing a good backstory", "Write what you have knowledge of", "Add as much factors that you know into your story"],
   answer: "Write what you have knowledge of",
   category: "Writing"
 },

 //VISUALS
  {
   question: "Why might you want to do research before starting ?",
   options: ["To properly ground your character’s clothing style, history, and culture", "To fInd the fanciest clothing pieces to put on your character", "To lock in ONE specific design and make no further changes", "To limit the creator’s creativity to expand"],
   answer: "To properly ground your character’s clothing style, history, and culture",
   category: "Visuals"
 },
  {
   question: "What makes thumbnail sketches so important?",
   options: ["It’s easier to post on social media", "To experiment with many different alterations of your character", "Doing the same thing 100 times helps you", "They aren’t, detailed rendering is much more important"],
   answer: "To experiment with many different alterations of your character",
   category: "Visuals"
 },
   {
   question: "How would you display a character’s personality with their clothing?",
   options: ["By making them look really rich for no apparent reason", "By giving them clothing items that don’t match their time period ", "By make their outfit so basic the audience doesn’t pay attention", "By adding features that reflect their culture, status, and history"],
   answer: "By adding features that reflect their culture, status, and history",
   category: "Visuals"
 },
   {
   question: "Colour blocking allows you to…",
   options: ["Have strict protocols on how to colour your character", "Make your character appear invisible to the your background", "Draw attention to every part of your character at the same time", "Create good ratios that guides the viewer’s eye without clutter or messiness"],
   answer: "Create good ratios that guides the viewer’s eye without clutter or messiness",
   category: "Visuals"
 },
   {
   question: "By using a moodboard, you are… ",
   options: ["Creating the vibes of your character they will follow", "Helping yourself count how much your character costs", "Tracking your mood about the character’s development", "Giving yourself a barrier from changing your character’s concept"],
   answer: "Creating the vibes of your character they will follow",
   category: "Visuals"
 },
];


// ELEMENTS
const progressBar = document.getElementById("progress-bar")
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
correctSound.volume = 0.4;
const incorrectSound = new Audio("wrong.mp3");
incorrectSound.preload = "auto";
incorrectSound.volume = 0.4;


// accuracy metrics
const categoryMetrics = {
 "Basics": { correct: 0, incorrect: 0 },
 "Visuals": { correct: 0, incorrect: 0 },
 "Writing": { correct: 0, incorrect: 0 }
};


// creates and displays the question on the screen
function showQuestion() {

  if (progressBar) {
  // calcualate progres based on position
  const progressPercentage = Math.round(((currentQuestion) / quizData.length) * 100);
    progressBar.style.width = `${progressPercentage}%`;
}
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

   window.removeEventListener("beforeunload", preventAccidentalLeave);
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
          font: { family: 'Courier New', size: 14, weight: 'bold', } }
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
           font: { family: 'Courier New', size: 14, weight: 'bold', }
         }
       },
       x: {
         ticks: {
          color: '#23303d', 
          font: { family: 'Courier New', size: 14,
                      weight: 'bold',

           } }
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
showQuestion()
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