const heartButton = document.getElementById("heartButton");
const heartIcon = document.getElementById("heartIcon");

heartButton.addEventListener("click", () => {
  if (heartIcon.classList.contains("far")) {
    heartIcon.classList.remove("far");
    heartIcon.classList.add("fas");
  } else {
    heartIcon.classList.remove("fas");
    heartIcon.classList.add("far");
  }

  heartButton.classList.toggle("filled");

  heartButton.classList.add("bouncing");

  setTimeout(() => {
    heartButton.classList.remove("bouncing");
  }, 300);
});
