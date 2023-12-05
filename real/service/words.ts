import path from 'path';
import fs from 'fs';
import { T_Word } from '~/app/main/[[...slug]]/page';

export async function getPost(word: string | string[]) {
  const readFile = (arg: string) => {
    const thePath = path.join(process.cwd(), 'data', `${arg}.json`);
    const words = fs.readFileSync(thePath, 'utf-8');
    return words;
  };
  if (word.length > 1) {
    const target = JSON.parse(readFile(word[0])).find(
      (el: T_Word) => el.rank === +word[1],
    );
    return target;
  }

  return JSON.parse(readFile(word as string));
}

export async function getWords(searchText: string) {
  const word = await getPost([...searchText][0]);
  const resEn = word.map((el: T_Word) => {
    const { ex } = el;
    return Object.keys(ex);
  });
  console.log(resEn);
}
