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