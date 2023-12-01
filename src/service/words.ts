import path from "path";
import fs from "fs";

export async function getPost(word: string): Promise<{ words: string }> {
  const thePath = path.join(process.cwd(), "data", `${word}.json`);
  console.log(thePath);

  const words = fs.readFileSync(thePath, "utf-8");

  return { words };
}
