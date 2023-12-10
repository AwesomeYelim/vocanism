/**
 * 1. 컴포넌트 : dataCombine.ts
 * 2. 작성일 : 2023.12.07 / 15시 10분 06초
 * 3. 작성자 : 홍예림
 * 4. 설명 : 기존 root data 합치는 함수
 */

import { cloneDeep } from "lodash";
import fs from "fs";
import prettier from "prettier";

const naverCrawDicFn = async () => {
  try {
    const readFile = (arg: string) => {
      const words = fs.readFileSync(`./data/${arg}.json`, "utf-8");
      return JSON.parse(words);
    };
    const idiomObj = readFile("bible-lection");
    const filtered = [...new Set(idiomObj.filter((el : any) => !el.description).map((el : any) =>  el.from.match(/[가-힣]+/)[0]))]
    // const detailObj = readFile("detailIdiom");
    // const copyobj = cloneDeep(detailObj);

    const bibleContents = [
      '신',   '사',   '시',   '마',   '요',
      '롬',   '빌',   '딤후', '벧후', '계',
      '민',   '왕상', '느',   '욥',   '행',
      '딤전', '요일', '전',   '약',   '잠',
      '히',   '살후', '출',   '레',   '미',
      '고후', '골',   '벧전', '단',   '갈',
      '살전', '렘',   '습',   '눅',   '시편',
      '고전', '엡',   '말'
    ]
console.log(filtered);

    // for (let row in idiomObj) {
    //   if (!detailObj[row]) {
    //     copyobj[row] = [idiomObj[row]];
    //   }
    // }

    // fs.writeFile(
    //   `./naverData/copyidiom.json`,
    //   await prettier.format(JSON.stringify(copyobj), { filepath: `./naverData/copyidiom.json` }),
    //   // JSON.stringify(ulList),
    //   (err) => console.log(err)
    // );
  } catch (error) {
    console.log(error);
  }
};
naverCrawDicFn();
