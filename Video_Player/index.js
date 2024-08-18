const video = document.getElementById("myVideo");
const playPauseBtn = document.getElementById("playPauseBtn");
const seekBar = document.getElementById("seekBar");
const muteBtn = document.getElementById("muteBtn");
const volumeBar = document.getElementById("volumeBar");
const settingsBtn = document.getElementById("settingsBtn");
const captions = document.getElementById("captions");
const playbackSpeed = document.getElementById("playbackSpeed");

// Play/Pause functionality
playPauseBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "pause";
  } else {
    video.pause();
    playPauseBtn.textContent = "play";
  }
});

// Update progress bar and seek video
video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime;
  const duration = video.duration;
  seekBar.value = (currentTime / duration) * 100;
});

seekBar.addEventListener("input", () => {
  const seekTime = video.duration * (seekBar.value / 100);
  video.currentTime = seekTime;
});

// Mute/Unmute functionality
muteBtn.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;
    muteBtn.textContent = "volume_up";
    volumeBar.hidden = true; // Hide volume bar on unmute
  } else {
    video.muted = true;
    muteBtn.textContent = "volume_off";
    volumeBar.hidden = false; // Show volume bar on mute
  }
});

// Update volume based on slider
volumeBar.addEventListener("input", () => {
  video.volume = volumeBar.value;
});

// Show/Hide volume control on mute button click
muteBtn.addEventListener("click", () => {
  const volumeControl = document.querySelector(
    ".video-player__controls__volume-control"
  );
  volumeControl.classList.toggle("show"); // Toggle visibility using class
});

// Smooth seek bar update
video.addEventListener("playing", () => {
  seekBar.style.transition = "width 0.1s ease-in-out"; // Smooth transition on playing
});

video.addEventListener("pause", () => {
  seekBar.style.transition = "none"; // Disable transition on pause
});
