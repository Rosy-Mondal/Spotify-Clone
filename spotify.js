console.log("Your music is here.");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio('Rockabye.mp3'); // Default song
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('anne'));
let isShuffling = false; // Track shuffle state
let isLooping = false;  // Initialize the variable for looping

let songs = [

    { songName: 'Rockabye', filePath: 'Rockabye.mp3', coverPath: 'Rockabye.png' },
    { songName: 'Our Song', filePath: 'Our Song.mp3', coverPath: 'Our Song.png' },
    { songName: 'Ciao Adios', filePath: 'Ciao Adios.mp3', coverPath: 'Ciao Adios.png' },
    { songName: 'SAD B!TCH', filePath: 'SAD B!TCH.mp3', coverPath: 'SAD B!TCH.png' },
    { songName: 'PSYCHO', filePath: 'PSYCHO.mp3', coverPath: 'PSYCHO.png' },

    { songName: 'Levitating', filePath: 'Levitating.mp3', coverPath: 'Levitating.png' },
    { songName: 'New Rules', filePath: 'jio.mp3', coverPath: 'New Rules.png' },
    { songName: 'Be the One', filePath: 'Be The One.mp3', coverPath: 'Be the One.png' },
    { songName: 'Houdini', filePath: 'Houdini.mp3', coverPath: 'Houdini.png' },
    { songName: 'Training Season', filePath: 'Training Season.mp3', coverPath: 'Training Season.png' },
];

songItems.forEach((element, i) => {
    if (songs[i]) { // Check if the song exists
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByTagName("span")[0].innerText = songs[i].songName;
    }
}
);

// Shuffle Function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle Button Handler
document.getElementById('shuffleButton').addEventListener('click', () => {
    isShuffling = !isShuffling; // Toggle shuffle state
    document.getElementById('shuffleButton').classList.toggle('active'); // Optional: add an active state
    if (isShuffling) {
        shuffleArray(songs); // Shuffle the songs
        songIndex = 0; // Reset to the first song in the shuffled list
        audioElement.src = songs[songIndex].filePath;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        updateSongDetails();
        gif.style.opacity = 1;
    }
});


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Set progress bar max value when audio metadata is loaded
audioElement.addEventListener('loadedmetadata', () => {
    myProgressBar.max = audioElement.duration;
});

// Seek function
myProgressBar.addEventListener('input', () => {
    let seekTime = myProgressBar.value * audioElement.duration / 100;
    audioElement.currentTime = seekTime;
});

function updateSongDetails() {
    masterSongName.textContent = `Currently Playing: ${songs[songIndex].songName}`;  // Updated to masterSongName
    coverPhoto.src = songs[songIndex].coverPath;  // Update cover photo
}

// Play specific song from list
songItems.forEach((element, i) => {
    element.addEventListener('click', (e) => {
        songIndex = i;
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');

      // Update the song details
      updateSongDetails();

       // Show the GIF
       gif.style.opacity = 1;

    })
});

// Forward Button
document.getElementById('forwardButton').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Loop back to the first song after the last one
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    updateSongDetails();

    // Show the GIF
    gif.style.opacity = 1;
});

// Backward Button
document.getElementById('backwardButton').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Loop back to the last song if it's the first one
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    updateSongDetails();

    // Show the GIF
    gif.style.opacity = 1;
});


// Automatically play the next song when the current one ends
audioElement.addEventListener('ended', () => {
    if (isLooping) {
        audioElement.currentTime = 0;
        audioElement.play();
    } else {
        document.getElementById('forwardButton').click();
    }
});


// Initialize volume control
let volumeControl = document.getElementById('myProgressBar2');

// Set initial volume
audioElement.volume = volumeControl.value / 8; // Scale from 0 to 1

// Update volume based on the slider
volumeControl.addEventListener('input', () => {
    audioElement.volume = volumeControl.value / 8; // Scale from 0 to 1
});

// Loop Button
document.getElementById('loopButton').addEventListener('click', () => {
    isLooping = !isLooping;  // Toggle the looping state
    document.getElementById('loopButton').classList.toggle('active');  // Optional: add an active state to the loop button
});

