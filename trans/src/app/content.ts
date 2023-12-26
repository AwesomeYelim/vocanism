// import axios from "axios";
import speak, { detectedLanguage } from './sounds'

const tooltipEvent = async (selection: Selection) => {
  const root = document.querySelector('body') as HTMLBodyElement

  const tooltipRoot = document.createElement('div')
  tooltipRoot.classList.add('tooltip')
  root.appendChild(tooltipRoot)

  const selectedText = selection.toString()

  if (
    selectedText.replace(/\s/g, '') &&
    detectedLanguage(selectedText) !== 'kor'
  ) {
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()

    tooltipRoot.style.position = 'absolute'
    tooltipRoot.style.top = `${rect.bottom + window.scrollY}px`
    tooltipRoot.style.left = `${rect.left + window.scrollX}px`

    tooltipRoot.style.backgroundColor = 'black'
    tooltipRoot.style.color = '#fff'
    tooltipRoot.style.fontSize = '0.8rem'
    tooltipRoot.style.padding = '3px 7px'
    tooltipRoot.style.borderRadius = '3px'
    tooltipRoot.innerText = selectedText

    if (selectedText) {
      // chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      //     const activeTab = tabs[0];
      //     chrome.tabs.sendMessage(activeTab.id as number, { message: selectedText }, response => {
      //       console.log('Text from content script:', response.text);
      //     });
      //   });
      chrome.runtime.sendMessage({ selectedText }, (response) => {
        if (chrome.runtime.lastError) {
          // Handle the error, as the context might be invalidated
          console.error('Error sending message:', chrome.runtime.lastError)
        } else {
          console.log(selectedText, response)
        }
      })
    }
  }
  const removeTooltip = () => {
    root.removeChild(tooltipRoot)
    window.removeEventListener('mouseup', removeTooltip)
  }

  window.addEventListener('mouseup', removeTooltip)
  return () => {
    root.removeChild(tooltipRoot)
    window.removeEventListener('mouseup', removeTooltip)
  }
}

const detectEvent = (e: MouseEvent) => {
  const seletion = window.getSelection() as Selection
  speak({ text: seletion.toString() })
  tooltipEvent(seletion)
}

window.addEventListener('dblclick', detectEvent)
window.addEventListener('mouseup', detectEvent)
