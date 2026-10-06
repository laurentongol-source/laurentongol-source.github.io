document.addEventListener("DOMContentLoaded", () => {
    const sound = document.getElementById("click-sound");

    // Select all links and your quiz buttons
    const interactiveElements = document.querySelectorAll(".navbar-RIGHT a, .startCONTENTS a, #quizbtn, button#QUIZ");

    interactiveElements.forEach(element => {
        element.addEventListener("mousedown", () => {
            sound.currentTime = 0; // Reset to start
            sound.play();          // Fire the quick sound immediately
        });
    });
});