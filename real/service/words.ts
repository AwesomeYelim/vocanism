import path from 'path';
import fs from 'fs';
import { T_Word } from '~/app/main/[[...slug]]/page';

export const readFile = (...arg: string[]) => {
  if (arg.length > 1) {
    const last = arg.pop();
    const thePath = path.join(process.cwd(), 'data', ...arg, `${last}.json`);
    const words = fs.readFileSync(thePath, 'utf-8');
    return JSON.parse(words);
  }
};
export async function geteEtymology(word: string | string[]) {
  if (word?.length > 1) {
    const target = readFile('etymology', word[0] || 'A').find(
      (el: T_Word) => el.rank === +word[1],
    );
    return target;
  }
  return readFile('etymology', (word as string) || 'A');
}

export async function getWords(searchText: string) {
  const word = await geteEtymology([...searchText][0]);
  const resEn = word.map((el: T_Word) => {
    const { ex } = el;
    return Object.keys(ex);
  });
}
