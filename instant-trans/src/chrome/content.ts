//content.ts

export {}

const reactAppListener = (color: string) => {
  console.log('content got the messsage ', color)
  document.body.style.background = color
}

// attach listener
chrome.runtime.onMessage.addListener(reactAppListener)
