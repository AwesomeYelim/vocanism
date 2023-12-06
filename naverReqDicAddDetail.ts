import axios from "axios";
import fs from "fs";
import prettier from "prettier";

type IS = { [key in string]: string | number } | any;
const naverCrawDicFn = async () => {
  try {
    const totalCount = 351; // 18
    let mappingData: IS[] = [];
    for (let i = 10; i < 19; i++) {
      const res = await axios.get(
        `https://open-pro.dict.naver.com/ivo-data/dict/entrys?currentPage=${i}&enName=cwzpcwwqbgcwwqcxhobgcwwqdsqyofiosjwedm&pageSize=20&entryStatus=&orderType=all&editorId=&shoulderType=0&entryCategory=&keyword=`
      );

      res.data.data.items.forEach((item: IS, j: number) => {
        const { entryName, displayedMean, entryDetail, entryId } = item;
        const detail = JSON.parse((entryDetail as unknown as { detailJson: string }).detailJson);

        let inObj: IS = {};
        const uniq = (i - 1) * 20 + (j + 1);
        inObj = {
          rank: uniq,
          root: entryName,
          meaning: displayedMean,
          origin: detail.mainEntryMember.etymology,
        };

        for (let key in detail) {
          if (key.includes("custom_field")) {
            if (detail[key][0].match(/\b[A-Z][a-zA-Z]*\b/g)) {
              inObj["from"] = detail[key];
            } else {
              inObj["ex"] = inObj.ex ? [...new Set([...inObj.ex, ...detail[key]])] : detail[key];
            }
          }
        }

        mappingData[uniq] = inObj;
      });
    }
    mappingData = mappingData.filter((el) => !!el);
    console.log(mappingData, mappingData.length);
    fs.writeFile(
      `./naverData/root2.json`,
      await prettier.format(JSON.stringify(mappingData), { filepath: `./naverData/root.json` }),
      (err) => console.log(err)
    );
  } catch (error) {
    console.log(error);
  }
};

naverCrawDicFn();
