document.addEventListener('DOMContentLoaded', () => {

    const STAR_COUNT = 200;
    const starBackground = document.createElement('div');
    starBackground.id = 'star-background';
    document.body.prepend(starBackground);

    for (let i = 0; i < STAR_COUNT; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;

        // Size
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Animation Delay & Duration
        const duration = Math.random() * 2 + 1;
        const delay = Math.random() * 2;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        starBackground.appendChild(star);
    }
});