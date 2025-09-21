document.addEventListener("DOMContentLoaded", () => {
    // --- Get all the elements ---
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

    let lastVolume = 0.3; // Initialize with the default volume

    // --- Helper Functions ---
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => {
            albumArt.click(); // Clicking overlay also closes the expanded view
        });
        return overlay;
    }

    // --- Audio Setup ---
    audio.volume = lastVolume; // Set initial volume

    function setAudioData() {
        seekBar.max = Math.floor(audio.duration);
        durationEl.textContent = formatTime(audio.duration);
    }

    if (audio.readyState > 0) {
        setAudioData();
    } else {
        audio.addEventListener("loadedmetadata", setAudioData);
    }

    // --- Event Listeners ---

    // Playback Controls
    toggleBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            toggleBtn.classList.add("playing");
        } else {
            audio.pause();
            toggleBtn.classList.remove("playing");
        }
    });

    skipBtn.addEventListener("click", () => { audio.currentTime += 10; });
    rewindBtn.addEventListener("click", () => { audio.currentTime -= 10; });
    audio.addEventListener("ended", () => { toggleBtn.classList.remove("playing"); });

    // Seek Bar and Time Updates
    audio.addEventListener("timeupdate", () => {
        seekBar.value = Math.floor(audio.currentTime);
        currentTimeEl.textContent = formatTime(audio.currentTime);
        const progressPercent = (audio.duration) ? (audio.currentTime / audio.duration) * 100 : 0;
        seekBar.style.setProperty('--seek-before-width', `${progressPercent}%`);
    });

    seekBar.addEventListener("input", () => {
        audio.currentTime = seekBar.value;
    });

    // Volume Controls (Combined and Improved)
    function handleVolumeChange() {
        audio.muted = false;
        audio.volume = volumeSlider.value;

        if (audio.volume == 0) {
            volumeIcon.textContent = "🔇";
        } else {
            volumeIcon.textContent = "🔊";
            lastVolume = audio.volume; // Update lastVolume when not muted
        }
    }

    volumeSlider.addEventListener("input", handleVolumeChange);

    volumeIcon.addEventListener("click", () => {
        if (audio.muted || audio.volume === 0) {
            // Unmute: restore last known volume
            volumeSlider.value = lastVolume;
            handleVolumeChange(); // Use the same function to update everything
        } else {
            // Mute: save current volume and set to 0
            audio.muted = true;
            audio.volume = 0;
            volumeSlider.value = 0;
            volumeIcon.textContent = "🔇";
        }
    });

    // Expanded Album Art
    albumArt.addEventListener("click", () => {
        const overlay = document.querySelector('.overlay') || createOverlay();
        const isExpanded = albumArt.classList.toggle("expanded");

        overlay.classList.toggle("visible", isExpanded);
        document.body.classList.toggle('overlay-active', isExpanded);

        if (!isExpanded) {
            setTimeout(() => {
                // Only remove the overlay if it's not visible
                if (!overlay.classList.contains("visible")) {
                    overlay.remove();
                }
            }, 300); // Match CSS transition time
        }
    });
});