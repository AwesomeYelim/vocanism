/**
 * 1. 컴포넌트 : dataCombineReduce.ts
 * 2. 작성일 : 2023.12.08 / 14시 25분 16초
 * 3. 작성자 : 홍예림
 * 4. 설명 : 데이터 누적 함수
 */

import { cloneDeep } from "lodash";
import fs from "fs";
import prettier from "prettier";
import { IS } from "./naverReqDicAddDetail";

const dataRootCombineFn = async () => {
  try {
    const readFile = (arg: string) => {
      const words = fs.readFileSync(`./naverData/${arg}.json`, "utf-8");
      return JSON.parse(words);
    };
    const targetArr = (capital: number) => readFile(`TOEIC_TOFLE/data_${capital}`);
    let obj = {};
    for (let i = 1; i < 47; i++) {
      const targetFile = cloneDeep(targetArr(i));
      obj = { ...obj, ...targetFile };
    }
    fs.writeFileSync(
      `./naverData/TOEIC_TOFLE/data.json`,
      await prettier.format(JSON.stringify(obj), {
        filepath: `./naverData/TOEIC_TOFLE/data.json`,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
dataRootCombineFn();
