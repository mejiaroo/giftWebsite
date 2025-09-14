const starsContainer = document.querySelector('.stars');

function createShootingStar() {
  const star = document.createElement('div');
  star.classList.add('star');

  // Random start position anywhere on top or left
  const fromTop = Math.random() < 0.5;
  const startX = fromTop ? Math.random() * window.innerWidth : -50;
  const startY = fromTop ? -50 : Math.random() * window.innerHeight;
  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;

  // Random direction and distance
  const dx = fromTop
    ? (Math.random() * 400 - 200) // left/right
    : 400 + Math.random() * 200; // mostly to right
  const dy = fromTop
    ? 400 + Math.random() * 200 // mostly down
    : (Math.random() * 400 - 200); // top/bottom

  const duration = 800 + Math.random() * 700; // ms

  starsContainer.appendChild(star);

  let startTime = null;
  const trailInterval = 20; // create a trail dot every 20ms
  const trailDots = [];

  function animateStar(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Move star
    const x = startX + dx * progress;
    const y = startY + dy * progress;
    star.style.left = x + "px";
    star.style.top = y + "px";

    // Create a trail dot
    if (elapsed % trailInterval < 16) { // roughly every 20ms
      const dot = document.createElement('div');
      dot.classList.add('star');
      dot.style.left = x + 'px';
      dot.style.top = y + 'px';
      dot.style.opacity = 0.5;
      dot.style.width = '2px';
      dot.style.height = '2px';
      starsContainer.appendChild(dot);
      trailDots.push(dot);

      // Fade out dot
      setTimeout(() => {
        dot.remove();
      }, 600);
    }

    if (progress < 1) {
      requestAnimationFrame(animateStar);
    } else {
      star.remove();
    }
  }

  requestAnimationFrame(animateStar);
}

// Spawn stars at random intervals
function spawnStars() {
  createShootingStar();
  const nextTime = 300 + Math.random() * 1200; // 0.3s to 1.5s
  setTimeout(spawnStars, nextTime);
}

spawnStars();
