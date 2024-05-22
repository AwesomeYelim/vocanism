import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { selectedText } = await req.json();

  const apiUrl = `https://api.mymemory.translated.net/get?q=${selectedText}&langpair=en|ko`;
  let response;

  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    response = await res.json();
    return NextResponse.json({
      message: '성공',
      res: response.responseData.translatedText,
    });
  } catch (error) {
    console.error('Error during translation:', error);
  }

  return NextResponse.json({
    message: '성공',
    res: response.responseData.translatedText,
  });
}
