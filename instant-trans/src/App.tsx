function App() {
  const test = () => {
    console.log('test')

    chrome.runtime.onInstalled.addListener(() => {
      console.log('Extension Installed')
    })

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id as number

      const selectedText = (window.getSelection() as Selection).toString()
      alert(selectedText)

      // chrome.scripting.executeScript(
      //   {
      //     target: { tabId: activeTabId },
      //     files: ['script.js'],
      //   },
      //   () => {
      //     document.body.style.backgroundColor = '#333'
      //   },
      // )
    })
  }
  return (
    <div className="App" onClick={test}>
      sample
    </div>
  )
}

export default App
