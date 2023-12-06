import axios from "axios";
import fs from "fs";
import prettier from "prettier";

const naverCrawDicFn = async () => {
  try {
    const obj: { [key in string]: string } = {};
    for (let i = 1; i < 13; i++) {
      const res = await axios.get(
        `https://open-pro.dict.naver.com/ivo-data/dict/entrys?currentPage=${i}&enName=22aa32b2afe242c3a5a70b78896fae19&pageSize=20&entryStatus=&orderType=like_num&editorId=&shoulderType=0&entryCategory=&keyword=`
      );
      //   console.log(res.data.data.items);

      res.data.data.items.forEach((item: { [key in string]: string }) => {
        const { entryName, displayedMean } = item;
        obj[entryName] = displayedMean;
      });
    }

    console.log(obj);
    fs.writeFile(
      `./data/idiom.json`,
      await prettier.format(JSON.stringify(obj), { filepath: `./data/idiom.json` }),
      // JSON.stringify(ulList),
      (err) => console.log(err)
    );
  } catch (error) {
    console.log(error);
  }
};

naverCrawDicFn();
