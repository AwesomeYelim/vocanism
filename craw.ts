import axios from "axios";
import fs from "fs";
import cheerio, { AnyNode, BasicAcceptedElems } from "cheerio";
import prettier from "prettier";

const getHtml = async () => {
  try {
    // A : 471
    // B : 472
    // C : 473
    // D : 474
    // E : 475 // 여기서 차이생김
    // F : 478
    // G : 479
    // H : 480
    // I : 481
    // J : 482
    // K : 483
    // L : 484
    // M : 485
    // N : 486
    // ...
    for (let i = 0; i < 26; i++) {
      const en = Array.from({ length: 26 }, (v, i) => String.fromCharCode(i + 65)); // 알파벳

      const html = await axios.get(`https://softca.tistory.com/${i > 4 ? 471 + i + 2 : 471 + i}`);
      // const html = await axios.get(`https://softca.tistory.com/${471}`);
      let ulList: [] = [];

      const $ = cheerio.load(html.data);

      // const wordsList = $("div.tt_article_useless_p_margin table tbody");
      const wordsList = $("table tbody tr");
      let from = "";

      const translate = async (cont: string) => {
        const config = {
          headers: {
            "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
            "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
          },
        };

        await axios
          .post("https://openapi.naver.com/v1/papago/n2mt", { source: "en", target: "ko", text: cont }, config)
          .then((res) => {
            console.log(res);

            return res;
          })
          .catch((err) => {
            console.log({ err });
          });
      };
      wordsList.map((i, element) => {
        if ($(element).find("td:first-child").text() && i) {
          const example = () => {
            const obj: { [key: string]: string } = {};
            (() =>
              $(element)
                .find("td:nth-child(4)")
                .text()
                .replace(/\s/g, "")
                .split(",")
                .forEach((el) => {
                  if (el.includes("(")) {
                    const [en, ko] = el.split("(");
                    obj[en] = ko?.replace(")", "");
                  } else {
                    (obj as any)[el] = translate(el);
                  }
                }))();

            return obj;
          };

          (ulList as any)[i] = {
            rank: i,
            root: $(element).find("td:first-child").text(),
            meaning: $(element).find("td:nth-child(2)").text().replace(/\s+/g, "").split(","),
            origin: $(element)
              .find("td:nth-child(3)")
              .text()
              .replace(/\s+/g, "")
              .split(",")
              .map((el) => {
                if (el.includes("from")) {
                  const [w, f] = el.split("from");
                  from = f;
                  return w;
                }
                return el;
              }),
            from,
            ex: example(),
          };
        }
      });
      ulList.shift();
      fs.writeFile(
        `./data/${en[i]}.json`,
        await prettier.format(JSON.stringify(ulList), { filepath: `./data/${en[i]}.json` }),
        // JSON.stringify(ulList),
        (err) => console.log(err)
      );
      console.log("bodyList : ", ulList);
    }
  } catch (error) {
    console.error(error);
  }
};

getHtml();
