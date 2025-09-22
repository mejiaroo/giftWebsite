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
            "cairoBirthday6", "cairoBirthday8", "cairoBirthday9",
            "cairoBirthday10", "cairoBirthday7", "cairoBirthday11", "flowers2"
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
        "infamousCairo": "THE infamous cairo picture. He looks very dapper in his birthday fit",
        "cairoRugLoaf": "My first time witnessing cairo on the apeach rug. He was timid from the start",
        "firstGalleria": "Our first time going to the galleria. This was the only photo I had to remember it...",
        "chickenKatsuCurry": "You cooked us chicken katsu curry :3 it was very yummy",
        "flowers": "The 'side-of-the-highway' flowers I got you. This sunflower stem was so hard to cut",
        "pakkunTakingPhoto1": "You like your flowers hehe",
        "pakkunTakingPhoto2": "Still taking pictures of them",
        "matcha1": "The first matcha you made for me",
        "matcha2": "Some commemorative photos for the matchas of course",
        "matcha3": "And an aerial view as well",
        "firstCluckers": "LOL this is just a funny photo I took but this was you putting me onto cluckers",
        "cairoBirthday1": "CAIRROOOOOOO HE IS SO CUTE omg I want to eat him",
        "cairoBirthday2": "Look at him layin down with his little COSTUME :3 he was probably relieved we took it off but idc",
        "cairoBirthday3": "And he is inspecting all of his GIFTS",
        "cairoBirthday4": "Lighting his candle for his birthday HE TURNED 4 HAHAHAH HEHEHE",
        "cairoBirthday5": "Taking a picture with his mommy for his 4th birthday muahaha :3",
        "cairoBirthday6": "CHEEESEE taking a picture with his cake hehe",
        "cairoBirthday8": "LOL look at him, so weary of the fire",
        "cairoBirthday9": "He is like a caveman who has just made this discovery",
        "cairoBirthday10": "I think he understands that we are celebrating him now",
        "cairoBirthday7": "Okay if he didnt understand before, now he definitely does look at this FEAST (no fancy)",
        "cairoBirthday11": "Showing so much alum pride",
        "flowers2": "Some more flower pictures",
        "preparingForMaine1": "Picture #1 preparing to go to Maine, had to clean the seat you would sit on",
        "preparingForMaine2": "And then I cleaned the outside of the car because it was very DAWRSTY",
        "preparingForMaine3": "My experimentation to see if the tings would fit",
        "firstTimeCherryWine": "My first encounter with cherry wine... I remember the first day I tried learning this",
        "funnyPakkunSleeping": "LOL my first creep shot of you sleeping this way",
        "portlandRun1": "OUR RUN IN PORTLAND hehe I actually really enjoyed this looking back at it",
        "portlandRun2": "Da pakkun taking photos of the boats",
        "eventide1": "Our favorite restaurant of this trip. This lobster bisque was so gas",
        "eventide2": "THE lobster roll of Maine, it wasnt even close",
        "eventide3": "The man from parasite with his meager roll",
        "creepPhoto1": "CREEP photo... I needed to remember this",
        "firstTimeDragonfruit": "Your first encounter with mr dragonfruit jellycat",
        "lobsterRollFlight1": "This flight of lobster rolls",
        "lobsterRollFlight2": "And more importantly, look at how pleased you are taking this photo",
        "lighthouse1": "THE LIGHTHOUSE!! WOW this was a great destination you chose",
        "lighthouse2": "You are dual wielding cameras.. Im pretty sure at this point you were taking photos with 3 cameras too",
        "lighthouse3": "The photo with the lighthouse in the back",
        "lighthouse4": "A different angle because I didnt know what looked best... my photography skills were lacking for this trip",
        "lighthouse5": "Some more photos of you and the sunset",
        "lighthouse6": "Now just the sunset...",
        "lighthouse7": "And this random one I was just taking photos cause I didnt know what looked good",
        "pakkunIceCream1": "DA PAKKUN with your favorite ice cream of Maine",
        "theHoneyPaw": "The place where we had the mi goreng",
        "tapNBarrelTavern1": "Your shishito peppers are better",
        "tapNBarrelTavern2": "Probably one of my favorite photos of the trip",
        "tapNBarrelTavern3": "This lobster roll was so AHH",
        "tapNBarrelTavern4": "Our inspiration for the kimchi burger in tx this was SO GOOD",
        "tapNBarrelTavern5": "This lobster roll was not good enough for this photo",
        "creepPhoto2": "Creep photo #2... one in portland and one in bar harbor muehehe",
        "prettyPakkun": "DA PRETTY PAKKUN",
        "pakkunIceCream2": "WOW ANOTHER ONE of my favorite photos of the trip",
        "pakkunRandom1": "LOL I liked taking random photos of you everywhere idek what you were photographing",
        "pakkunGnarly": "Setting up to break out into the gnarly choreography",
        "pakkunRandom2": "After our RUN which I REALLY enjoyed not only was it physically fun but I enjoyed the view",
        "funnyCannon": "HAHAHA this was a good idea from you",
        "pakkunIceCream3": "I DIDNT UNDERSTAND why you were making this face at the time the picture was taken, I see it now",
        "pakkunIceCream4": "A good photo of the ice cream",
        "hiking1": "The first hiking photo of the website hehe",
        "hikingSelfie1": "My first candid hiking selfie",
        "hikingSelfie2": "I included 2 of these in the folder apparently...",
        "hiking3": "A quarter of the way done with GREAT HEAD",
        "hikingSelfie3": "Our walk from thunder hole to sand beach I believe",
        "hiking2": "THE VIEW (you) with sand beach in the back too I suppose",
        "hiking4": "LOL striking a pose on the hike. Enjoy this series of your dance moves on this rock",
        "hiking5": "bow",
        "hiking6": "chicka",
        "hiking7": "bow",
        "hiking8": "wow",
        "hiking9": "Me taking a photo of you taking a photo.. a common theme during this little photo book",
        "hikingSelfie4": "Candid selfie #2 (or 3)",
        "hikingSelfie5": "You caught me this time..",
        "hiking10": "Me trying to replicate the hiking photo you took of me",
        "hiking11": "LOL THE FUNNY ONE",
        "hiking12": "I committed to taking photos of you at every point during the rest of this hike",
        "hiking13": "",
        "hiking14": "",
        "hiking15": "",
        "hiking16": "",
        "hiking17": "",
        "hiking18": "",
        "hikingSelfie6": "",
        "hiking19": "",
        "hiking20": "",
        "hiking21": "",
        "hiking22": "",
        "hiking23": "",
        "hiking24": "",
        "hiking25": "",
        "hikingSelfie7": "",
        "hiking26": "",
        "hiking27": "",
        "tent1": "",
        "tent2": "",
        "campfire1": "",
        "campfire2": "",
        "campfire3": "",
        "campfire4": "",
        "tent3": "",
        "thriveJuiceBar1": "",
        "thriveJuiceBar2": "",
        "thriveJuiceBar3": "",
        "schoodicPoint1": "",
        "schoodicPoint2": "",
        "ravensNest1": "",
        "ravensNest2": "",
        "ravensNest3": "",
        "hikingSelfie8": "",
        "ravensNest4": "",
        "picnicBH": "",
        "beerFlight": "",
        "failedVeggies": "",
        "cadillacMountain": "",
        "randomPitstop": "",
        "mangiaToscano": "",
        "frontOfHouse": "",
        "chopped": "",
        "pakkunNaruto": "",
        "firstTenSecond": "",
        "imChopped": "",
        "wigglyScreen": "",
        "ilyPakkun": "",
        "ilyPakkun2": "",
        "wtfIsMyFace": "",
        "pakkunMatcha": "",
        "bestBirthday": "",
        "bestBirthday2": "",
        "bestBirthday3": "",
        "ilyPakkun3": ""
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

            if (filename === 'hiking11') {
                polaroidDiv.id = 'bipy-polaroid';
            }

            if (filename.endsWith('.mp4')) {
                const video = document.createElement('video');
                const baseFilename = filename.substring(0, filename.lastIndexOf('.'));
                video.src = `images/${folderName}/${filename}`;
                video.poster = `images/${folderName}/thumbnails/${baseFilename}-poster.webp`;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.width = 200;
                video.height = 200;
                polaroidDiv.appendChild(video);

                video.addEventListener('click', () => {
                    if (polaroidDiv.classList.contains('expanded')) {
                        return;
                    }

                    const currentlyExpanded = document.querySelector('.polaroid.expanded, .album-art.expanded');
                    if (currentlyExpanded) {
                        currentlyExpanded.classList.remove('expanded');
                        const otherVideo = currentlyExpanded.querySelector('video');
                        if (otherVideo) {
                            otherVideo.muted = true;
                            otherVideo.controls = false;
                        }
                    }

                    polaroidDiv.classList.add('expanded');
                    overlay.classList.add('visible');
                    document.body.classList.add('overlay-active');
                    video.muted = false;
                    video.controls = true;
                });

            } else {
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

                polaroidDiv.addEventListener('click', () => {
                    if (polaroidDiv.classList.contains('expanded')) {
                        return;
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