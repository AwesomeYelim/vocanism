import path from 'path';
import fs from 'fs';
import { T_Word } from '~/app/main/[[...slug]]/page';

export async function getPost(word: string): Promise<T_Word[]> {
  const thePath = path.join(process.cwd(), 'data', `${word}.json`);

  const words = fs.readFileSync(thePath, 'utf-8');

  return JSON.parse(words);
}

export async function getWords(word: string[]): Promise<T_Word> {
  const theWords = await getPost(word[0]);
  console.log(word);

  const target = theWords.find((el: T_Word) => el.rank === +word[1]);
  console.log(target);

  return target;
}
