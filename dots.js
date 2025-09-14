const box = document.querySelector("#oval-banner .dots");
for (let i = 0; i < 200; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");

  const size = 10;
  dot.style.width = dot.style.height = size + "px";
  box.appendChild(dot);
}