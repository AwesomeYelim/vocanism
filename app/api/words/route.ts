import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dir = searchParams.get('dir') || 'native'; // 기본값 'native'로 설정

  // data 디렉토리 내의 폴더 경로를 읽어옵니다
  const filePath = path.join(process.cwd(), 'data', dir, 'data.json');

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonContent = JSON.parse(fileContent); // JSON 문자열을 객체로 변환

    return NextResponse.json({
      status: 200,
      res: jsonContent,
    });
  } catch (error) {
    return new Response('Failed to read file', {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
