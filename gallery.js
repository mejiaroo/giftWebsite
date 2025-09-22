document.addEventListener('DOMContentLoaded', () => {
    buildGallery();
});

function getOrCreateOverlay() {
    let overlay = document.querySelector('.page-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'page-overlay';
        document.body.appendChild(overlay);

        // Updated Overlay Click Listener
        overlay.addEventListener('click', () => {
            const expandedElement = document.querySelector('.polaroid.expanded, .album-art.expanded');

            if (expandedElement) {
                // Remove the expanded class to collapse it
                expandedElement.classList.remove('expanded');

                // Check if the closing element contains a video
                const video = expandedElement.querySelector('video');
                if (video) {
                    // Reset the video state
                    video.muted = true;
                    video.controls = false;
                }
            }

            // Hide the overlay and re-enable body scrolling
            overlay.classList.remove('visible');
            document.body.classList.remove('overlay-active');
        });
    }
    return overlay;
}

async function buildGallery() {
    const galleryContainer = document.getElementById('gallery');
    if (!galleryContainer) {
        console.error('Gallery container not found!');
        return;
    }

    const photoFolders = {
        '1firstVisit': ["airport", "firstTimeApartment", "cairoUgg"],
        '2newYork': ["firstTrain", "secondTrain", "firstDate"],
        '3secondVisit': [
            "arriveHouston", "infamousCairo", "cairoRugLoaf", "firstGalleria",
            "chickenKatsuCurry", "flowers", "pakkunTakingPhoto1", "pakkunTakingPhoto2",
            "matcha1", "matcha2", "matcha3", "firstCluckers", "cairoBirthday1",
            "cairoBirthday2", "cairoBirthday3", "cairoBirthday4", "cairoBirthday5",
            "cairoBirthday6", "cairoBirthday7", "cairoBirthday8", "cairoBirthday9",
            "cairoBirthday10", "cairoBirthday11", "flowers2"
        ],
        '4maineTrip': [
            "preparingForMaine1", "preparingForMaine2", "preparingForMaine3",
            "firstTimeCherryWine", "funnyPakkunSleeping", "portlandRun1", "portlandRun2",
            "eventide1", "eventide2", "eventide3", "creepPhoto1", "firstTimeDragonfruit",
            "lobsterRollFlight1", "lobsterRollFlight2", "lighthouse1", "lighthouse2",
            "lighthouse3", "lighthouse4", "lighthouse5", "lighthouse6", "lighthouse7",
            "pakkunIceCream1", "theHoneyPaw", "tapNBarrelTavern1", "tapNBarrelTavern2",
            "tapNBarrelTavern3", "tapNBarrelTavern4", "tapNBarrelTavern5", "creepPhoto2",
            "prettyPakkun", "pakkunIceCream2", "pakkunRandom1", "pakkunGnarly", "pakkunRandom2",
            "funnyCannon", "pakkunIceCream3", "pakkunIceCream4", "hiking1", "hikingSelfie1",
            "hikingSelfie2", "hiking3", "hikingSelfie3", "hiking2", "hiking4", "hiking5",
            "hiking6", "hiking7", "hiking8", "hiking9", "hikingSelfie4", "hikingSelfie5",
            "hiking10", "hiking11", "hiking12", "hiking13", "hiking14", "hiking15",
            "hiking16", "hiking17", "hiking18", "hikingSelfie6", "hiking19", "hiking20",
            "hiking21", "hiking22", "hiking23", "hiking24", "hiking25", "hikingSelfie7",
            "hiking26", "hiking27", "tent1", "tent2", "campfire1", "campfire2", "campfire3",
            "campfire4", "tent3", "thriveJuiceBar1", "thriveJuiceBar2", "thriveJuiceBar3",
            "schoodicPoint1", "schoodicPoint2", "ravensNest1", "ravensNest2", "ravensNest3",
            "hikingSelfie8", "ravensNest4", "picnicBH", "beerFlight", "failedVeggies",
            "cadillacMountain", "randomPitstop", "mangiaToscano", "frontOfHouse", "cuteVideo.mp4"
        ],
        '5thirdVisit': [
            "chopped", "pakkunNaruto", "firstTenSecond", "imChopped", "wigglyScreen",
            "ilyPakkun", "ilyPakkun2", "wtfIsMyFace", "pakkunMatcha", "bestBirthday",
            "bestBirthday2", "bestBirthday3", "ilyPakkun3", "photoBooth.mp4"
        ],
    };
    const sectionTitles = {
        '1firstVisit': "First Time Meeting",
        '2newYork': "Brief Encounters in New York",
        '3secondVisit': "Second Time Around",
        '4maineTrip': "Maine Adventures",
        '5thirdVisit': "Third Time's a Charm",
    };
    const photoCaptions = {
        "airport": "Made it to the airport, nervous but excited for our first time meeting!",
        "firstTimeApartment": "Back from Austin, first time seeing CAIROOOO",
        "cairoUgg": "Cairo seems to like the stench of my feet...",
        "firstTrain": "A strange but necessary record to keep to commemorate our rendezvous in new york",
        "secondTrain": "A strange but necessary record to keep to commemorate our rendezvous in new york pt.2",
        "firstDate": "Stolen directly from your notion jone... my first time being stood up but I look so happy",
        "arriveHouston": "SECOND time going to tx to see you, just as nervous as the first time",
        "infamousCairo": "", "cairoRugLoaf": "", "firstGalleria": "", "chickenKatsuCurry": "",
        "flowers": "", "pakkunTakingPhoto1": "", "pakkunTakingPhoto2": "", "matcha1": "", "matcha2": "",
        "matcha3": "", "firstCluckers": "", "cairoBirthday1": "", "cairoBirthday2": "", "cairoBirthday3": "",
        "cairoBirthday4": "", "cairoBirthday5": "", "cairoBirthday6": "", "cairoBirthday7": "", "cairoBirthday8": "",
        "cairoBirthday9": "", "cairoBirthday10": "", "cairoBirthday11": "", "flowers2": "", "preparingForMaine1": "",
        "preparingForMaine2": "", "preparingForMaine3": "", "firstTimeCherryWine": "", "funnyPakkunSleeping": "",
        "portlandRun1": "", "portlandRun2": "", "eventide1": "", "eventide2": "", "eventide3": "", "creepPhoto1": "",
        "firstTimeDragonfruit": "", "lobsterRollFlight1": "", "lobsterRollFlight2": "", "lighthouse1": "", "lighthouse2": "",
        "lighthouse3": "", "lighthouse4": "", "lighthouse5": "", "lighthouse6": "", "lighthouse7": "", "pakkunIceCream1": "",
        "theHoneyPaw": "", "tapNBarrelTavern1": "", "tapNBarrelTavern2": "", "tapNBarrelTavern3": "", "tapNBarrelTavern4": "",
        "tapNBarrelTavern5": "", "creepPhoto2": "", "prettyPakkun": "", "pakkunIceCream2": "", "pakkunRandom1": "",
        "pakkunGnarly": "", "pakkunRandom2": "", "funnyCannon": "", "pakkunIceCream3": "", "pakkunIceCream4": "",
        "hiking1": "", "hikingSelfie1": "", "hikingSelfie2": "", "hiking3": "", "hikingSelfie3": "", "hiking2": "",
        "hiking4": "", "hiking5": "", "hiking6": "", "hiking7": "", "hiking8": "", "hiking9": "", "hikingSelfie4": "",
        "hikingSelfie5": "", "hiking10": "", "hiking11": "", "hiking12": "", "hiking13": "", "hiking14": "", "hiking15": "",
        "hiking16": "", "hiking17": "", "hiking18": "", "hikingSelfie6": "", "hiking19": "", "hiking20": "", "hiking21": "",
        "hiking22": "", "hiking23": "", "hiking24": "", "hiking25": "", "hikingSelfie7": "", "hiking26": "", "hiking27": "",
        "tent1": "", "tent2": "", "campfire1": "", "campfire2": "", "campfire3": "", "campfire4": "", "tent3": "",
        "thriveJuiceBar1": "", "thriveJuiceBar2": "", "thriveJuiceBar3": "", "schoodicPoint1": "", "schoodicPoint2": "",
        "ravensNest1": "", "ravensNest2": "", "ravensNest3": "", "hikingSelfie8": "", "ravensNest4": "", "picnicBH": "",
        "beerFlight": "", "failedVeggies": "", "cadillacMountain": "", "randomPitstop": "", "mangiaToscano": "",
        "frontOfHouse": "", "chopped": "", "pakkunNaruto": "", "firstTenSecond": "", "imChopped": "", "wigglyScreen": "",
        "ilyPakkun": "", "ilyPakkun2": "", "wtfIsMyFace": "", "pakkunMatcha": "", "bestBirthday": "", "bestBirthday2": "",
        "bestBirthday3": "", "ilyPakkun3": ""
    };
    const overlay = getOrCreateOverlay();

    function yieldToMain() {
        return new Promise(resolve => setTimeout(resolve, 0));
    }

    galleryContainer.innerHTML = '';

    for (const folderName in photoFolders) {
        const photoFilenames = photoFolders[folderName];
        if (photoFilenames.length === 0) continue;

        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'gallery-section';
        const titleElement = document.createElement('h2');
        titleElement.textContent = sectionTitles[folderName] || `Collection ${folderName}`;
        const gridDiv = document.createElement('div');
        gridDiv.className = 'gallery-grid';

        sectionDiv.appendChild(titleElement);
        sectionDiv.appendChild(gridDiv);
        galleryContainer.appendChild(sectionDiv);

        const BATCH_SIZE = 5;
        for (let i = 0; i < photoFilenames.length; i++) {
            const filename = photoFilenames[i];
            const polaroidDiv = document.createElement('div');
            polaroidDiv.className = 'polaroid';

            if (filename.endsWith('.mp4')) {
                // --- VIDEO LOGIC ---
                const video = document.createElement('video');
                video.src = `images/${folderName}/${filename}`;
                video.loop = true;
                video.muted = true;
                video.playsInline = true; // Essential for iOS
                video.width = 200;
                video.height = 200;
                polaroidDiv.appendChild(video);

                // Add click listener to the video to handle expansion
                video.addEventListener('click', () => {
                    // If already expanded, do nothing to let controls work
                    if (polaroidDiv.classList.contains('expanded')) {
                        return;
                    }

                    // Close any other item that is currently expanded
                    const currentlyExpanded = document.querySelector('.polaroid.expanded, .album-art.expanded');
                    if (currentlyExpanded) {
                        currentlyExpanded.classList.remove('expanded');
                        const otherVideo = currentlyExpanded.querySelector('video');
                        if (otherVideo) {
                            otherVideo.muted = true;
                            otherVideo.controls = false;
                        }
                    }

                    // Expand this video's polaroid
                    polaroidDiv.classList.add('expanded');
                    overlay.classList.add('visible');
                    document.body.classList.add('overlay-active');
                    video.muted = false;
                    video.controls = true; // Show player controls
                });

            } else {
                // --- IMAGE LOGIC ---
                const img = document.createElement('img');
                const smallImgPath = `images/${folderName}/thumbnails/${filename}-400w.webp`;
                const largeImgPath = `images/${folderName}/large/${filename}-1200w.webp`;

                img.src = smallImgPath;
                img.srcset = `${smallImgPath} 400w, ${largeImgPath} 1200w`;
                img.sizes = "(max-width: 768px) 70vw, 250px";
                img.alt = filename;
                img.loading = 'lazy';
                img.width = 200;
                img.height = 200;
                img.onerror = function () {
                    this.onerror = null;
                    this.src = 'https://placehold.co/200x200/ffe4e1/8b008b?text=Image+Missing';
                };
                polaroidDiv.appendChild(img);

                // Add click listener to the image's polaroid to handle expansion
                polaroidDiv.addEventListener('click', () => {
                    if (polaroidDiv.classList.contains('expanded')) {
                        return; // Clicking an expanded image does nothing
                    }
                    const currentlyExpanded = document.querySelector('.polaroid.expanded, .album-art.expanded');
                    if (currentlyExpanded) {
                        currentlyExpanded.classList.remove('expanded');
                    }
                    polaroidDiv.classList.add('expanded');
                    overlay.classList.add('visible');
                    document.body.classList.add('overlay-active');
                });
            }

            const captionDiv = document.createElement('div');
            captionDiv.className = 'caption';
            captionDiv.textContent = photoCaptions[filename.replace('.mp4', '')] || '';
            polaroidDiv.appendChild(captionDiv);
            gridDiv.appendChild(polaroidDiv);

            if ((i + 1) % BATCH_SIZE === 0) {
                await yieldToMain();
            }
        }
    }
}