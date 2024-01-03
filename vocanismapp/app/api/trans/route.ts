import { NextResponse } from 'next/server';

const config = {
  headers: {
    'X-Naver-Client-Id': 'S3GDTg2lKCPUYCK7W0ky',
    'X-Naver-Client-Secret': 'xC_9vS5aQi',
  },
};

export async function POST(req: Request) {
  const { selectedText } = await req.json();

  const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';
  let response;

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
        text: selectedText,
      }).replace(/\s/g, ''),
    });

    response = await res.json();
    console.log(response.message.result.translatedText);

    return NextResponse.json({
      message: '성공',
      res: response.message.result.translatedText,
    });
  } catch (error) {
    console.error('Error during translation:', error);
  }

  return NextResponse.json({
    message: '성공',
    res: response.message.result.translatedText,
  });
}
