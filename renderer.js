// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const constraints = { video: { width: 1280, height: 720 } }
const video = document.querySelector('video')
video.style.cursor = 'none'

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  video.srcObject = mediaStream
  video.onloadedmetadata = function(e) {
    video.play()
    reportWindowSize()
  };
})
.catch(function(err) { console.log(err.name + ": " + err.message) })

const reportWindowSize = () => {
  video.style.maxHeight = window.innerHeight + 'px'
}
window.addEventListener('resize', reportWindowSize)

const worker = new Worker('worker.js')
const clock = document.getElementsByClassName('clock')[0]
worker.onmessage = function(event) {
  const data = event.data
  switch (data.type) {
  case 'clock':
    clock.innerHTML = data.time
    break
  case 'mouse-hide':
    video.style.cursor = 'none'
    break
  }
}
worker.postMessage('Hello!')

window.addEventListener('mousemove', () => {
  video.style.cursor = ''
  worker.postMessage('MouseMove!')
})