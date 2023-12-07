import path from 'path';
import fs from 'fs';
import { T_Word } from '~/app/main/[[...slug]]/page';

export const readFile = (arg: string) => {
  if (arg) {
    const thePath = path.join(process.cwd(), 'data', `${arg}.json`);
    const words = fs.readFileSync(thePath, 'utf-8');
    return JSON.parse(words);
  }
};
export async function getPost(word: string | string[]) {
  if (word?.length > 1) {
    const target = readFile(`Alphabet/${word[0]}`).find(
      (el: T_Word) => el.rank === +word[1],
    );
    return target;
  } else {
    return readFile(`Alphabet/${word[0]}`);
  }
}

export async function getWords(searchText: string) {
  const word = await getPost([...searchText][0]);
  const resEn = word.map((el: T_Word) => {
    const { ex } = el;
    return Object.keys(ex);
  });
}
