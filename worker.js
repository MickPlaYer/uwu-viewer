const init = () => {
  let counter = new Date().getSeconds()
  setInterval(() => {
    counter++
    if (counter == 60) {
      counter = 0
      updateClock()
    }
  }, 1000)
}

const updateClock = () => {
  self.postMessage({
    type: 'clock',
    time: new Date().toTimeString().slice(0, 5),
  })
}

let hideMouseTimer
const hideMouseLater = () => {
  if (hideMouseTimer) {
    clearTimeout(hideMouseTimer)
  }
  hideMouseTimer = setTimeout(
    () => { self.postMessage({ type: 'mouse-hide' }) },
    1000,
  )
}

self.onmessage = function(e) {
  if (e.data === 'Hello!') {
    init()
    updateClock()
  } else if (e.data === 'MouseMove!') {
    hideMouseLater()
  }
}