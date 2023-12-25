import axios from 'axios';
import { NextResponse } from 'next/server';

const config = {
  headers: {
    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
  },
};

export async function POST(req: Request) {
  const text = await req.json();

  const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';
  let response;
  try {
    response = await axios.post(
      apiUrl,
      { source: 'en', target: 'ko', text },
      config,
    );
  } catch (error) {
    console.log({ error });
  }

  return NextResponse.json({
    message: '성공',
    res: response?.data.message.result.translatedText,
  });
}
