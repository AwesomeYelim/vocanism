/**
 * 1. 컴포넌트 : dataRootCombine.ts
 * 2. 작성일 : 2023.12.07 / 15시 09분 08초
 * 3. 작성자 : 홍예림
 * 4. 설명 : 중복데이터 제외한 새로운 데이터 추가하는 함수
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
    const rootArr: IS = readFile("root");
    const targetArr = (capital: string) => readFile(`data/${capital}`);

    for (let row of rootArr) {
      const firstLetter = [...row.root][0].toUpperCase();
      let copyTarget = cloneDeep(targetArr(firstLetter));
      const isInclude = targetArr(firstLetter).every((item: IS) => item.root.replace(/\([^)]*\)/g, "") !== row.root);

      if (isInclude) {
        const copyEx: IS = {};
        if (row.meaning && row.meaning.includes(",")) {
          row["meaning"] = row.meaning.split(",").map((el: string) => el.trim());
        }
        if (row.origin && row.origin.includes("=")) {
          row["origin"] = row.origin.split("=").map((el: string) => el.trim());
        }
        if (row.ex && row.ex.length) {
          row.ex.forEach((item: string) => {
            const eR = /^[a-zA-Z]+$/;
            const kR = /^[가-힣]+$/;
            if (item.includes("/")) {
              item.split("/").forEach((el) => {
                const [e, k] = el.trim().split(" ");
                if (eR.test(e) && kR.test(k)) {
                  copyEx[e] = k;
                }
              });
            } else {
              const [e, k] = item.split(" ");
              if (eR.test(e) && kR.test(k)) {
                copyEx[e] = k;
              }
            }
          });
        }
        copyTarget.push({ ...row, rank: targetArr(firstLetter).length + 1, moreEx: row.ex, ex: copyEx });
        console.log(copyTarget);

        fs.writeFileSync(
          `./naverData/data/${firstLetter}.json`,
          await prettier.format(JSON.stringify(copyTarget), {
            filepath: `./naverData/data/${firstLetter}.json`,
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};
dataRootCombineFn();
