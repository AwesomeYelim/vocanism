const config = {
  headers: {
    'X-Naver-Client-Id': 'S3GDTg2lKCPUYCK7W0ky',
    'X-Naver-Client-Secret': 'xC_9vS5aQi',
  },
}
const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt'

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
      body: JSON.stringify({
        source: 'en',
        target: 'ko',
        text: message.selectedText,
      }).replace(/\s/g, ''),
    })

    const responseData = await res.json()
    console.log(responseData.message.result.translatedText)
  } catch (error) {
    console.error('Error during translation:', error)
    sendResponse({ error })
  }
  return true
})
