/* Edit this file */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = video.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}
function handleProgess() {
  const prog = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${prog}%`;
  console.log(prog);
}
function handleSkip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  console.log(this.value);
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgess);
console.log("Hello");

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((btn) => btn.addEventListener("click", handleSkip));
ranges.forEach((ran) => ran.addEventListener("change", handleRangeUpdate));
ranges.forEach((ran) => ran.addEventListener("mousemove", handleRangeUpdate));

console.log(skipButtons);
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
