// NVABAR

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
    listItem.classList.add("history-card"); // 🔑 Injects a clean CSS class name
    
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

    if (clearBTN) {
    clearBTN.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete all your quiz history scores permanently?")) {
        localStorage.removeItem("quizHistoryLog");
        window.location.reload();
      }
    });
  }
});