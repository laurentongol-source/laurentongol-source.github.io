document.addEventListener("DOMContentLoaded", () => {
  const historyList = document.getElementById("history-list");
  const clearBTN = document.getElementById("clearHistoryBtn");

  const savedHistroyStr = localStorage.getItem("quizHistoryLog");
  const quizHistory = JSON.parse(savedHistroyStr);

  if (!quizHistory) return;

  if (!quizHistory || quizHistory.length == 0) {
    historyList.innerHTML = `
      <li style="text-align: center; font-family: 'Courier New', monospace; color: #3f7895; font-size: 18px; padding: 20px;">
      No quiz records found. Take the quiz to see your track history!
      </li>
    `;
    return;
  }

historyList.innerHTML ="";

// Render out the historic performance card modules
  quizHistory.forEach((attempt, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("history-card");
    
    listItem.innerHTML = `
      <div class="card-meta">
        Attempt #${quizHistory.length - index} — ${attempt.date}
      </div>
      <div class="card-body">
        <span class="card-score">Score: ${attempt.percentage}%</span>
        <span class="card-badge">(${attempt.correct}/${attempt.total} Correct)</span>
      </div>
    `;

    historyList.appendChild(listItem);
  });

  //give USERS warning about deletion
    if (clearBTN) {
    clearBTN.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete all your quiz history scores permanently?")) {
        localStorage.removeItem("quizHistoryLog");
        window.location.reload();
      }
    });
  }
});

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