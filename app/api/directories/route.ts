import fs from 'fs';
import path from 'path';

export async function GET() {
  const directoryPath = path.join(process.cwd(), 'data'); // data 폴더 경로
  const items = fs.readdirSync(directoryPath);

  const directories = items.filter((item) => {
    const itemPath = path.join(directoryPath, item);
    return fs.statSync(itemPath).isDirectory();
  });

  return new Response(JSON.stringify(directories), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
