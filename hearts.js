const heartsContainer = document.querySelector('.hearts');
        const heartCount = 30; // number of hearts

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');

            // Random horizontal start position
            heart.style.left = Math.random() * 100 + 'vw';

            // Random size using scale
            const scale = 0.5 + Math.random() * 1.2; // 0.5 to 1.7
            heart.style.transform = `rotate(45deg) scale(${scale})`;

            // Random animation duration
            heart.style.animationDuration = (4 + Math.random() * 5) + 's';

            // Random delay so they don't all start at once
            heart.style.animationDelay = (Math.random() * 5) + 's';

            // Optional: random color
            const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb'];
            heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            heart.style.setProperty('--before-color', heart.style.backgroundColor);
            heart.style.setProperty('--after-color', heart.style.backgroundColor);

            heartsContainer.appendChild(heart);
        }