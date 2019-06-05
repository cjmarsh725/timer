// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

/* Titlebar */

const remote = require('electron').remote; 
const window = remote.getCurrentWindow();

document.getElementById("minimize-btn").addEventListener("click", function (e) {
  window.minimize();
});

const btn = document.getElementById("maximize-btn");
btn.addEventListener("click", function (e) {
  if (window.isMaximized()) {
    window.unmaximize();
  } else {
    window.maximize();
  }
});

window.on("maximize", e => {
  btn.classList.add("unmaximize-btn");
})

window.on("unmaximize", e => {
  btn.classList.remove("unmaximize-btn");
})

document.getElementById("close-btn").addEventListener("click", function (e) {
  window.close();
});

const formatTime = seconds => {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
}


/* Timer */

document.getElementById("timer").innerHTML = formatTime(0);

let startTime = Math.floor(Date.now() / 1000);
let isOn = true;
const bell = new Audio("bell.wav");

const startTimer = time => {
  startTime = Math.floor(Date.now() / 1000);
  let t = setInterval(function() {
    const diff = Math.floor(Date.now() / 1000) - startTime;
    document.getElementById("timer").innerHTML = formatTime(diff);
    if (diff >= time) {
      clearInterval(t);
      bell.play();
      if (isOn) {
        isOn = false;
        startTimer(Number(document.getElementById("time-off").value));
      }
    }
  }, 1000);
}

document.getElementById("start-btn").addEventListener("click", e => {
  isOn = true;
  startTimer(Number(document.getElementById("time-on").value));
});
