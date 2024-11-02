// JavaScript for handling the slideshow
let imageInput = document.getElementById('image-input');
let startButton = document.getElementById('start-button');
let stopButton = document.getElementById('stop-button');
let clearButton = document.getElementById('clear-button');
let intervalInput = document.getElementById('interval-input');
let slideshowImage = document.getElementById('slideshow-image');
let beepToggle = document.getElementById('beep-toggle');  // Get reference to beep checkbox

let images = [];       // Array to hold the selected images
let shuffledImages = [];  // Shuffled array of images
let currentImageIndex = 0;
let interval = 4000;   // Default interval (4 seconds)
let timer = null;

// Default background image path (make sure "default.jpg" exists in the same directory)
let defaultImage = "default.jpg";

// Load saved images from localStorage
window.onload = () => {
    loadSavedImages();
};

// Function to start the slideshow
function startSlideshow() {
    if (images.length === 0) return alert("Please upload images to start the slideshow.");
    if (timer) clearInterval(timer);
    
    shuffleImages();  // Shuffle the images before starting
    timer = setInterval(() => {
        displayNextImage();
        playBeep();  // Play beep sound if enabled
    }, interval);
}

// Function to stop the slideshow
function stopSlideshow() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

// Function to display the next image in the shuffled array
function displayNextImage() {
    if (shuffledImages.length === 0) return;

    // Display the current image
    slideshowImage.src = shuffledImages[currentImageIndex];

    // Move to the next image
    currentImageIndex++;

    // If all images have been shown, reshuffle and start again
    if (currentImageIndex >= shuffledImages.length) {
        shuffleImages();
        currentImageIndex = 0;
    }
}

// Function to shuffle the images array
function shuffleImages() {
    shuffledImages = [...images];  // Copy the images array
    for (let i = shuffledImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];  // Swap elements
    }
}

// Automatically update the interval when the user changes the input
intervalInput.addEventListener('input', () => {
    let newInterval = parseFloat(intervalInput.value);
    if (newInterval > 0) {
        interval = newInterval * 1000;  // Convert to milliseconds
        if (timer) {
            stopSlideshow();  // Restart slideshow to apply new interval
            startSlideshow();
        }
    } else {
        alert("Please enter a valid interval time.");
    }
});

// Function to clear the uploaded images and reset to default image
function clearSlideshow() {
    stopSlideshow();
    images = [];
    shuffledImages = [];
    currentImageIndex = 0;
    slideshowImage.src = defaultImage;  // Set to default image
    localStorage.removeItem('slideshowImages');  // Clear saved images from localStorage
}

// Function to play a beep sound using an external audio file
function playBeep() {
    // Only play beep if checkbox is checked
    if (beepToggle.checked) {
        let beep = new Audio('beep.mp3');  // Ensure 'beep.mp3' is in the same folder
        beep.play().catch(error => console.log("Audio playback error: ", error));  // Handle any playback errors
    }
}

// Event listener for file upload
imageInput.addEventListener('change', (event) => {
    images = [];
    shuffledImages = [];
    let files = event.target.files;
    let imagePaths = [];

    for (let i = 0; i < files.length; i++) {
        let fileReader = new FileReader();
        fileReader.onload = (e) => {
            images.push(e.target.result);
            imagePaths.push(e.target.result);  // Save data URLs for localStorage
            if (images.length === 1) {
                slideshowImage.src = images[0];
            }
        };
        fileReader.readAsDataURL(files[i]);
    }

    // Save images to localStorage
    fileReader.onloadend = () => {
        localStorage.setItem('slideshowImages', JSON.stringify(imagePaths));
    };
});

// Function to load saved images from localStorage
function loadSavedImages() {
    let savedImages = JSON.parse(localStorage.getItem('slideshowImages'));
    if (savedImages && savedImages.length > 0) {
        images = savedImages;
        shuffledImages = [...images];
        currentImageIndex = 0;
        slideshowImage.src = images[0];
    }
}

// Event listeners for buttons
startButton.addEventListener('click', startSlideshow);
stopButton.addEventListener('click', stopSlideshow);
clearButton.addEventListener('click', clearSlideshow);
