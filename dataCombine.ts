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
      const words = fs.readFileSync(`./naverData/${arg}.json`, "utf-8");
      return JSON.parse(words);
    };
    const idiomObj = readFile("idiom");
    const detailObj = readFile("detailIdiom");
    const copyobj = cloneDeep(detailObj);

    for (let row in idiomObj) {
      if (!detailObj[row]) {
        copyobj[row] = [idiomObj[row]];
      }
    }

    fs.writeFile(
      `./naverData/copyidiom.json`,
      await prettier.format(JSON.stringify(copyobj), { filepath: `./naverData/copyidiom.json` }),
      // JSON.stringify(ulList),
      (err) => console.log(err)
    );
  } catch (error) {
    console.log(error);
  }
};
naverCrawDicFn();
