document.addEventListener("DOMContentLoaded", () => {
    // Get all the elements
    const audio = document.getElementById("my-audio");
    const toggleBtn = document.getElementById("toggle-btn");
    const skipBtn = document.getElementById("skip-btn");
    const rewindBtn = document.getElementById("rewind-btn");
    const seekBar = document.getElementById("seek-bar");
    const volumeSlider = document.getElementById("volume-slider");
    const currentTimeEl = document.querySelector(".time-current");
    const durationEl = document.querySelector(".time-duration");
    const albumArt = document.querySelector(".album-art");
    const volumeIcon = document.getElementById("volume-icon");

    // Helper function to format time in M:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Set default volume
    audio.volume = 0.3;

    // This function sets the duration and seekbar max
    function setAudioData() {
        seekBar.max = Math.floor(audio.duration);
        durationEl.textContent = formatTime(audio.duration);
    }

    // Check if the metadata is already loaded to avoid a race condition
    if (audio.readyState > 0) {
        setAudioData();
    } else {
        // If not, wait for it to load
        audio.addEventListener("loadedmetadata", setAudioData);
    }

    // Update seek bar and current time as song plays
    audio.addEventListener("timeupdate", () => {
        seekBar.value = Math.floor(audio.currentTime);
        currentTimeEl.textContent = formatTime(audio.currentTime);

        // Keep track of progress
        const progressPercent = (audio.duration) ? (audio.currentTime / audio.duration) * 100 : 0;
        seekBar.style.setProperty('--seek-before-width', `${progressPercent}%`);
    });

    albumArt.addEventListener("click", () => {
        const overlay = document.querySelector('.overlay') || createOverlay();

        if (albumArt.classList.contains("expanded")) {
            albumArt.classList.remove("expanded");
            overlay.classList.remove("visible");
            document.body.classList.remove('overlay-active');

            setTimeout(() => overlay.remove(), 300);
        } else {
            albumArt.classList.add("expanded");
            overlay.classList.add("visible");
            document.body.classList.add('overlay-active');
        }
    });

    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
            albumArt.click(); // Close the expanded view
        });

        return overlay;
    }

    // Allow user to scrub through the song
    seekBar.addEventListener("input", () => {
        audio.currentTime = seekBar.value;
    });

    // Reset play button when song ends
    audio.addEventListener("ended", () => {
        toggleBtn.classList.remove("playing");
    });

    // Play/Pause functionality
    toggleBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            toggleBtn.classList.add("playing"); // Show pause icon
        } else {
            audio.pause();
            toggleBtn.classList.remove("playing"); // Show play icon
        }
    });

    // Skip and Rewind functionality
    skipBtn.addEventListener("click", () => {
        audio.currentTime += 10;
    });
    rewindBtn.addEventListener("click", () => {
        audio.currentTime -= 10;
    });

    // Volume control
    volumeSlider.addEventListener("input", () => {
        audio.volume = volumeSlider.value;
    });

    let lastVolume = volumeSlider.value;

    volumeIcon.addEventListener("click", () => {
        if (audio.muted || audio.volume === 0) {
            // Unmute: restore last volume
            audio.muted = false;
            audio.volume = lastVolume;
            volumeSlider.value = lastVolume;
            volumeIcon.textContent = "🔊"; // speaker icon
        } else {
            // Mute: save current volume & set to 0
            lastVolume = audio.volume;
            audio.muted = true;
            audio.volume = 0;
            volumeSlider.value = 0;
            volumeIcon.textContent = "🔇"; // muted icon
        }
    });

    // Keep slider + icon in sync
    volumeSlider.addEventListener("input", () => {
        audio.muted = false;
        audio.volume = volumeSlider.value;
        if (audio.volume == 0) {
            volumeIcon.textContent = "🔇";
        } else {
            volumeIcon.textContent = "🔊";
            lastVolume = volumeSlider.value;
        }
    });
});