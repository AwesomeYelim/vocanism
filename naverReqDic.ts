/**
 * 1. 컴포넌트 : naverReqDic.ts
 * 2. 작성일 : 2023.12.07 / 15시 12분 54초
 * 3. 작성자 : 홍예림
 * 4. 설명 : 네이버 오픈사전  pro list api 요청 함수
 */

import axios from "axios";
import fs from "fs";
import prettier from "prettier";

const totalCount = Math.ceil(3720 / 100);

const naverCrawDicFn = async (j: number) => {
  try {
    const obj: { [key in string]: string[] } = {};
    const middleCount = 200 * j;

    for (let i = 1 * (j - 1) * 10; i < Math.ceil(middleCount / 20); i++) {
      const res = await axios.get(
        `https://open-pro.dict.naver.com/ivo-data/dict/entrys?currentPage=${i}&enName=5b78c844225e42e5b45493ebc87be458&pageSize=20&entryStatus=&orderType=all&editorId=&shoulderType=0&entryCategory=&keyword=`
      );
      //   console.log(res.data.data.items);

      res.data.data.items.forEach((item: { [key in string]: string }) => {
        const { entryName, displayedMean } = item;
        obj[entryName] = [...new Set(displayedMean.split("\n").filter((el) => !/^[\s​]*$/.test(el)))];
      });
    }

    console.log(obj);
    fs.writeFile(
      `./naverData/idiom${j}.json`,
      await prettier.format(JSON.stringify(obj), { filepath: `./naverData/idiom${j}.json` }),
      // JSON.stringify(ulList),
      (err) => console.log(err)
    );
  } catch (error) {
    console.log(error);
  }
};
naverCrawDicFn(1);
