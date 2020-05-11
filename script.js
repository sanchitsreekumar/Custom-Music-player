const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Song titles

const song = ['Camila Cabello, DaBaby - My Oh My',
    'Dan Auerbach - Never In My Wildest Dreams',
    'Doja Cat - Say So Why dont you say so',
    'EDEN - rock + roll',
    'Harry Styles - Adore You',
    'James Bay - Let It Go',
    'Jeremy zucker - every day (stripped.)',
    'Justin Bieber - Intentions ft. Quavo',
    'Lewis Capaldi - Before You Go',
    'Sasha Sloan - Dancing With Your Ghost'];


// Keep track of song
let songIndex = 9;

// Initially load song info into DOM
loadSong(song[songIndex]); // check the song index then load the details from song array

//Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`; // load the song according to source index
    cover.src = `pics/${song}.jpg`; // load the song cover 

}


// Play songs
function playSong() {
    musicContainer.classList.add('play'); //add play class to container
    playBtn.querySelector('i.fa').classList.remove('fa-play'); // remove the play button
    playBtn.querySelector('i.fa').classList.add('fa-pause'); // add the pause button

    audio.play(); //to play the song
}

//Pause song
function pauseSong() {
    musicContainer.classList.remove('play'); //add play class to container
    playBtn.querySelector('i.fa').classList.remove('fa-pause'); // remove the pause button
    playBtn.querySelector('i.fa').classList.add('fa-play'); // add the play button


    audio.pause(); //to play the song
}

// Previous song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = song.length - 1; // get the last song - 1 as it is index
    }

    loadSong(song[songIndex]);
    playSong();
}


// Next song
function nextSong() {
    songIndex++;

    if (songIndex > (song.length - 1)) {
        songIndex = 0;
    }

    loadSong(song[songIndex]);
    playSong();
}

// Update song progress
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement; // take out duration & current time from the source song
    const progressPercent = (currentTime / duration) * 100; // get the current value in percent
    progress.style.width = `${progressPercent}%`; // set the width of progress = progress percent
}

// Set song progress on click
function setProgress(e) {
    const width = this.clientWidth; // get the width of the progress bar
    const clickX = e.offsetX; // get the value of where you clicked
    const duration = audio.duration; // get the song total duration

    audio.currentTime = (clickX / width) * duration; // click width divide by the total width 
}


// EVENT LISTNERS

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play'); // if the music-container has play class...true or false
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time progress update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);