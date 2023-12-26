import path from 'path'
import fs from 'fs'

export const readFile = (...arg: string[]) => {
  if (arg.length > 1) {
    const last = arg.pop()
    const thePath = path.join(process.cwd(), 'data', ...arg, `${last}.json`)
    const words = fs.readFileSync(thePath, 'utf-8')
    return JSON.parse(words)
  }
}
export async function getLection() {
  const thePath = path.join(process.cwd(), 'data', 'bible-lection.json')
  const words = fs.readFileSync(thePath, 'utf-8')
  return JSON.parse(words)

  // if (word?.length > 1) {
  //   const target = readFile('etymology', word[0] || 'A').find(
  //     (el: T_Word) => el.rank === +word[1],
  //   );
  //   return target;
  // }
  // return readFile('etymology', (word as string) || 'A');
}
