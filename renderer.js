// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// Titlebar functionality
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