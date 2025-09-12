const box = document.getElementById("password-overlay");
for (let i = 0; i < 200; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");

  const size = 10; // dot size (5px–15px)
  dot.style.width = dot.style.height = size + "px";

  // keep dot inside the box (subtract its size from 100%)
  dot.style.left = Math.random() * (100 - (size / box.offsetWidth * 100)) + "%";
  dot.style.top  = Math.random() * (100 - (size / box.offsetHeight * 100)) + "%";
  box.appendChild(dot);
}