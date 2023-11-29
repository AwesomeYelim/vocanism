import path from "path";
import fs from "fs";

export async function getPost(word: string) {
  const thePath = path.join(process.cwd(), "data", `${word}.md`);

  const words = await fs.readFile(thePath, "utf-8");

  return { words };
}
