const correctPasswordHash = "d9c66716cd72ff52c8f1ee74cb34fad63ab83a8300fad5f93472e8c454b8bca3";
const overlay = document.getElementById("password-overlay");
const mainContent = document.getElementById("main-content");
const input = document.getElementById("password-input");
const submitBtn = document.getElementById("submit-password");
const errorMsg = document.getElementById("error-msg");

// Start with overlay active
document.body.classList.add('no-scroll');

// Function to check password
function checkPassword() {
  const inputHash = sha256(input.value.trim().toLowerCase());
  if (inputHash === correctPasswordHash) {
    const audio = document.getElementById("my-audio");
    const toggleBtn = document.getElementById("toggle-btn");
    // Try to play the audio
    audio.play().then(() => {
      toggleBtn.textContent = "⏸";
    }).catch(error => {
      console.error("Audio playback failed:", error);
    });
    overlay.style.display = "none";
    mainContent.style.display = "block";
    document.body.classList.remove('no-scroll');
    errorMsg.style.display = "none"; // hide error if previously shown

  } else {
    errorMsg.style.display = "block";
    input.value = "";
  }
}

// Click button
submitBtn.addEventListener("click", checkPassword);

// Press Enter key
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPassword();
});

// Optional: hide error when user starts typing
input.addEventListener("input", () => {
  errorMsg.style.display = "none";
});