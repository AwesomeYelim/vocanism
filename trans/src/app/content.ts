// import axios from "axios";
import speak, { detectedLanguage } from './sounds'

const tooltipEvent = async (e: MouseEvent) => {
  const root = document.querySelector('body') as HTMLBodyElement

  const tooltipRoot = document.createElement('div')
  tooltipRoot.classList.add('tooltip')
  root.appendChild(tooltipRoot)

  const selectedText = (window.getSelection() as Selection).toString()

  if (
    selectedText.replace(/\s/g, '') &&
    detectedLanguage(selectedText) !== 'kor'
  ) {
    const range = (window.getSelection() as Selection).getRangeAt(0)
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

      const res = chrome.runtime.sendMessage({ selectedText })
      console.log(selectedText, res)
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
  speak({ text: (window.getSelection() as Selection).toString() })
  tooltipEvent(e)
}

window.addEventListener('dblclick', detectEvent)
window.addEventListener('mouseup', detectEvent)
