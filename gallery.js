document.addEventListener('DOMContentLoaded', () => {
    // This function now runs asynchronously to avoid blocking the main thread.
    buildGallery();
});

/**
 * This function finds or creates a single overlay for the entire page to use.
 * This prevents conflicts between different scripts trying to create their own overlays.
 */
function getOrCreateOverlay() {
    let overlay = document.querySelector('.page-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'page-overlay';
        document.body.appendChild(overlay);

        // Add a general click listener to the overlay itself
        overlay.addEventListener('click', () => {
            // Find any active element (polaroid or album art) and close it
            const expandedElement = document.querySelector('.polaroid.expanded, .album-art.expanded');
            if (expandedElement) {
                expandedElement.classList.remove('expanded');
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

    // --- Configuration ---
    const photoFolders = {
        '1firstVisit': ["airport.jpg", "firstTimeApartment.jpg", "cairoUgg.jpg"],
        '2newYork': ["firstTrain.png", "secondTrain.png", "firstDate.jpg"],
        '3secondVisit': ["arriveHouston.jpg", "infamousCairo.jpg", "cairoRugLoaf.jpg", "firstGalleria.jpg", "chickenKatsuCurry.jpg", "flowers.jpg", "pakkunTakingPhoto1.jpg", "pakkunTakingPhoto2.jpg", "matcha1.jpg", "matcha2.jpg", "matcha3.jpg", "firstCluckers.jpg", "cairoBirthday1.jpg", "cairoBirthday2.jpg", "cairoBirthday3.jpg", "cairoBirthday4.jpg", "cairoBirthday5.jpg", "cairoBirthday6.jpg", "cairoBirthday7.jpg", "cairoBirthday8.jpg", "cairoBirthday9.jpg", "cairoBirthday10.jpg", "cairoBirthday11.jpg", "flowers2.jpg"],
        '4maineTrip': ["preparingForMaine1.jpg", "preparingForMaine2.jpg", "preparingForMaine3.jpg", "firstTimeCherryWine.png", "funnyPakkunSleeping.jpg", "portlandRun1.jpg", "portlandRun2.jpg", "eventide1.jpg", "eventide2.jpg", "eventide3.jpg", "creepPhoto1.jpg", "firstTimeDragonfruit.jpg", "lobsterRollFlight1.jpg", "lobsterRollFlight2.jpg", "lighthouse1.jpg", "lighthouse2.jpg", "lighthouse3.jpg", "lighthouse4.jpg", "lighthouse5.jpg", "lighthouse6.jpg", "lighthouse7.jpg", "pakkunIceCream1.jpg", "theHoneyPaw.jpg", "tapNBarrelTavern1.jpg", "tapNBarrelTavern2.jpg", "tapNBarrelTavern3.jpg", "tapNBarrelTavern4.jpg", "tapNBarrelTavern5.jpg", "creepPhoto2.jpg", "prettyPakkun.jpg", "pakkunIceCream2.jpg", "pakkunRandom1.jpg", "pakkunGnarly.jpg", "pakkunRandom2.jpg", "funnyCannon.jpg", "pakkunIceCream3.jpg", "pakkunIceCream4.jpg", "hiking1.jpg", "hikingSelfie1.jpg", "hikingSelfie2.jpg", "hiking3.jpg", "hikingSelfie3.jpg", "hiking2.jpg", "hiking4.jpg", "hiking5.jpg", "hiking6.jpg", "hiking7.jpg", "hiking8.jpg", "hiking9.jpg", "hikingSelfie4.jpg", "hikingSelfie5.jpg", "hiking10.jpg", "hiking11.jpg", "hiking12.jpg", "hiking13.jpg", "hiking14.jpg", "hiking15.jpg", "hiking16.jpg", "hiking17.jpg", "hiking18.jpg", "hikingSelfie6.jpg", "hiking19.jpg", "hiking20.jpg", "hiking21.jpg", "hiking22.jpg", "hiking23.jpg", "hiking24.jpg", "hiking25.jpg", "hikingSelfie7.jpg", "hiking26.jpg", "hiking27.jpg", "tent1.jpg", "tent2.jpg", "campfire1.jpg", "campfire2.jpg", "campfire3.jpg", "campfire4.jpg", "tent3.jpg", "thriveJuiceBar1.jpg", "thriveJuiceBar2.jpg", "thriveJuiceBar3.jpg", "schoodicPoint1.jpg", "schoodicPoint2.jpg", "ravensNest1.jpg", "ravensNest2.jpg", "ravensNest3.jpg", "hikingSelfie8.jpg", "ravensNest4.jpg", "picnicBH.jpg", "beerFlight.jpg", "failedVeggies.jpg", "cadillacMountain.jpg", "randomPitstop.jpg", "mangiaToscano.jpg", "frontOfHouse.jpg"],
        '5thirdVisit': ["chopped.jpg", "pakkunNaruto.jpg", "firstTenSecond.jpg", "imChopped.jpg", "wigglyScreen.jpg", "ilyPakkun.jpg", "ilyPakkun2.jpg", "wtfIsMyFace.jpg", "pakkunMatcha.jpg", "bestBirthday.jpg", "bestBirthday2.jpg", "bestBirthday3.jpg", "ilyPakkun3.jpg"],
    };
    const sectionTitles = {
        '1firstVisit': "First Time Meeting",
        '2newYork': "Brief Encounters in New York",
        '3secondVisit': "Second Time Around",
        '4maineTrip': "Maine Adventures",
        '5thirdVisit': "Third Time's a Charm",
    };
    const photoCaptions = {
        "airport.jpg": "Made it to the airport, nervous but excited for our first time meeting!",
        "firstTimeApartment.jpg": "",
        "cairoUgg.jpg": "",
        "firstTrain.png": "",
        "secondTrain.png": "",
        "firstDate.jpg": "",
        "arriveHouston.jpg": "",
        "infamousCairo.jpg": "",
        "cairoRugLoaf.jpg": "",
        "firstGalleria.jpg": "",
        "chickenKatsuCurry.jpg": "",
        "flowers.jpg": "",
        "pakkunTakingPhoto1.jpg": "",
        "pakkunTakingPhoto2.jpg": "",
        "matcha1.jpg": "",
        "matcha2.jpg": "",
        "matcha3.jpg": "",
        "firstCluckers.jpg": "",
        "cairoBirthday1.jpg": "",
        "cairoBirthday2.jpg": "",
        "cairoBirthday3.jpg": "",
        "cairoBirthday4.jpg": "",
        "cairoBirthday5.jpg": "",
        "cairoBirthday6.jpg": "",
        "cairoBirthday7.jpg": "",
        "cairoBirthday8.jpg": "",
        "cairoBirthday9.jpg": "",
        "cairoBirthday10.jpg": "",
        "cairoBirthday11.jpg": "",
        "flowers2.jpg": "",
        "preparingForMaine1.jpg": "",
        "preparingForMaine2.jpg": "",
        "preparingForMaine3.jpg": "",
        "firstTimeCherryWine.png": "",
        "funnyPakkunSleeping.jpg": "",
        "portlandRun1.jpg": "",
        "portlandRun2.jpg": "",
        "eventide1.jpg": "",
        "eventide2.jpg": "",
        "eventide3.jpg": "",
        "creepPhoto1.jpg": "",
        "firstTimeDragonfruit.jpg": "",
        "lobsterRollFlight1.jpg": "",
        "lobsterRollFlight2.jpg": "",
        "lighthouse1.jpg": "",
        "lighthouse2.jpg": "",
        "lighthouse3.jpg": "",
        "lighthouse4.jpg": "",
        "lighthouse5.jpg": "",
        "lighthouse6.jpg": "",
        "lighthouse7.jpg": "",
        "pakkunIceCream1.jpg": "",
        "theHoneyPaw.jpg": "",
        "tapNBarrelTavern1.jpg": "",
        "tapNBarrelTavern2.jpg": "",
        "tapNBarrelTavern3.jpg": "",
        "tapNBarrelTavern4.jpg": "",
        "tapNBarrelTavern5.jpg": "",
        "creepPhoto2.jpg": "",
        "prettyPakkun.jpg": "",
        "pakkunIceCream2.jpg": "",
        "pakkunRandom1.jpg": "",
        "pakkunGnarly.jpg": "",
        "pakkunRandom2.jpg": "",
        "funnyCannon.jpg": "",
        "pakkunIceCream3.jpg": "",
        "pakkunIceCream4.jpg": "",
        "hiking1.jpg": "",
        "hikingSelfie1.jpg": "",
        "hikingSelfie2.jpg": "",
        "hiking3.jpg": "",
        "hikingSelfie3.jpg": "",
        "hiking2.jpg": "",
        "hiking4.jpg": "",
        "hiking5.jpg": "",
        "hiking6.jpg": "",
        "hiking7.jpg": "",
        "hiking8.jpg": "",
        "hiking9.jpg": "",
        "hikingSelfie4.jpg": "",
        "hikingSelfie5.jpg": "",
        "hiking10.jpg": "",
        "hiking11.jpg": "",
        "hiking12.jpg": "",
        "hiking13.jpg": "",
        "hiking14.jpg": "",
        "hiking15.jpg": "",
        "hiking16.jpg": "",
        "hiking17.jpg": "",
        "hiking18.jpg": "",
        "hikingSelfie6.jpg": "",
        "hiking19.jpg": "",
        "hiking20.jpg": "",
        "hiking21.jpg": "",
        "hiking22.jpg": "",
        "hiking23.jpg": "",
        "hiking24.jpg": "",
        "hiking25.jpg": "",
        "hikingSelfie7.jpg": "",
        "hiking26.jpg": "",
        "hiking27.jpg": "",
        "tent1.jpg": "",
        "tent2.jpg": "",
        "campfire1.jpg": "",
        "campfire2.jpg": "",
        "campfire3.jpg": "",
        "campfire4.jpg": "",
        "tent3.jpg": "",
        "thriveJuiceBar1.jpg": "",
        "thriveJuiceBar2.jpg": "",
        "thriveJuiceBar3.jpg": "",
        "schoodicPoint1.jpg": "",
        "schoodicPoint2.jpg": "",
        "ravensNest1.jpg": "",
        "ravensNest2.jpg": "",
        "ravensNest3.jpg": "",
        "hikingSelfie8.jpg": "",
        "ravensNest4.jpg": "",
        "picnicBH.jpg": "",
        "beerFlight.jpg": "",
        "failedVeggies.jpg": "",
        "cadillacMountain.jpg": "",
        "randomPitstop.jpg": "",
        "mangiaToscano.jpg": "",
        "frontOfHouse.jpg": "",
        "chopped.jpg": "",
        "pakkunNaruto.jpg": "",
        "firstTenSecond.jpg": "",
        "imChopped.jpg": "",
        "wigglyScreen.jpg": "",
        "ilyPakkun.jpg": "",
        "ilyPakkun2.jpg": "",
        "wtfIsMyFace.jpg": "",
        "pakkunMatcha.jpg": "",
        "bestBirthday.jpg": "",
        "bestBirthday2.jpg": "",
        "bestBirthday3.jpg": "",
        "ilyPakkun3.jpg": ""
    };

    // Get the single, shared overlay for the page
    const overlay = getOrCreateOverlay();

    // Helper function to pause execution and let the browser handle user input
    function yieldToMain() {
        return new Promise(resolve => setTimeout(resolve, 0));
    }

    galleryContainer.innerHTML = ''; // Clear existing content

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

            const img = document.createElement('img');
            img.src = `images/${folderName}/${filename}`;
            img.alt = filename || "Gallery image";
            img.loading = 'lazy';
            img.width = 200;
            img.height = 200;

            // Add a fallback for broken images
            img.onerror = function () {
                this.onerror = null;
                this.src = 'https://placehold.co/200x200/ffe4e1/8b008b?text=Image+Missing';
            };

            const captionDiv = document.createElement('div');
            captionDiv.className = 'caption';
            captionDiv.textContent = photoCaptions[filename] || '';

            polaroidDiv.appendChild(img);
            polaroidDiv.appendChild(captionDiv);
            gridDiv.appendChild(polaroidDiv);

            // Add click listener to each polaroid
            polaroidDiv.addEventListener('click', () => {
                if (polaroidDiv.classList.contains('expanded')) {
                    polaroidDiv.classList.remove('expanded');
                    overlay.classList.remove('visible');
                    document.body.classList.remove('overlay-active');
                } else {
                    // First, close any other element that might be open
                    const currentlyExpanded = document.querySelector('.polaroid.expanded, .album-art.expanded');
                    if (currentlyExpanded) {
                        currentlyExpanded.classList.remove('expanded');
                    }
                    // Then, expand the clicked one
                    polaroidDiv.classList.add('expanded');
                    overlay.classList.add('visible');
                    document.body.classList.add('overlay-active');
                }
            });

            // After a batch, pause to allow the browser to respond to user input
            if ((i + 1) % BATCH_SIZE === 0) {
                await yieldToMain();
            }
        }
    }
}

