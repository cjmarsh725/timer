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


/* Timer */

const formatTime = seconds => {
  return new Date(seconds * 1000).toISOString().substr(14, 5);
}

// document.getElementById("timer").innerHTML = formatTime(0);

let startTime = Math.floor(Date.now() / 1000);
const bell = new Audio("bell.wav");
const prog = document.getElementById("progress");
const timer = document.getElementById("timer");
timer.innerHTML = formatTime(0);

const startTimer = time => {
  startTime = Math.floor(Date.now() / 1000);
  prog.style.width = "0";
  let t = setInterval(function() {
    const diff = Math.floor(Date.now() / 1000) - startTime;
    timer.innerHTML = formatTime(diff);
    prog.style.width = (diff / time * 100.0).toString() + "%";
    if (diff >= time) {
      clearInterval(t);
      bell.play();
      window.show();
    }
  }, 1000);
}

document.getElementById("start-btn").addEventListener("click", e => {
  startTimer(Number(document.getElementById("time").value) * 60);
});
