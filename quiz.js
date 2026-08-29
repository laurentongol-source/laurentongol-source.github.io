const quizData = [
    {
    question: "Is this a Question?",
    options: ["No", "Yes"],
    answer: "Yes"
    },
    {
    question: "Which of these are is NOT a fundamental of Character Design",
    options: ["Style and Tone", "Shape Language", "Story", "Star Quality"],
    answer: "Star Quality"
    },

];

const questionElement = document.getElementById("question")
const optionsElement = document.getElementById("options")
const submitbutton = document.getElementById("submit")

  let currentQuestion = 0;
  let score = 0;
  
  function showQuestion() {
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;

      optionsElement.innerHTML = "";
    question.options.forEach(option => {
      const button = document.createElement("button");
      button.innerText = option;
      optionsElement.appendChild(button);
      button.addEventListener("click", selectAnswer);
    });
  }

   function selectAnswer(e) {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer;
  
    if (selectedButton.innerText === answer) {
      score++;
    }
  
    currentQuestion++;
  
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    quiz.innerHTML = `
      <h1>Quiz Completed!</h1>
      <p>Your score: ${score}/${quizData.length}</p>
    `;
  }
  
  showQuestion();