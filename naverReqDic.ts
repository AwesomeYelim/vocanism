/**
 * 1. 컴포넌트 : naverReqDic.ts
 * 2. 작성일 : 2023.12.07 / 15시 12분 54초
 * 3. 작성자 : 홍예림
 * 4. 설명 : 네이버 오픈사전  pro list api 요청 함수
 */

import axios from "axios";
import fs from "fs";
import prettier from "prettier";

const totalCount = Math.ceil(11162 / 200);

const naverCrawDicFn = async (j: number) => {
  try {
    const obj: { [key in string]: string[] } = {};
    const middleCount = 200 * j;

    for (let i = 1 * (j - 1) * 10; i < Math.ceil(middleCount / 20); i++) {
      const res = await axios.get(
        `https://open-pro.dict.naver.com/ivo-data/dict/entrys?currentPage=${i}&enName=d47908323470485e874b1a918154ec11&pageSize=20&entryStatus=&orderType=like_num&editorId=&shoulderType=0&entryCategory=&keyword=`
      );

      res.data.data.items.forEach((item: { [key in string]: string }) => {
        const { entryName, displayedMean } = item;
        obj[entryName] = [...new Set(displayedMean.split("<br>").map((el) => el.replace(/^[\s​]*$/, "")))];
      });
    }
    console.log(obj);

    fs.writeFile(
      `./naverData/niv-bible/data_${j}.json`,
      await prettier.format(JSON.stringify(obj), { filepath: `./naverData/niv-bible/data_${j}.json` }),
      // JSON.stringify(ulList),
      (err) => console.log(err)
    );
  } catch (error) {
    console.log(error);
  }
};

// for (let i = 5; i < 10; i++) {
naverCrawDicFn(3);
// }
