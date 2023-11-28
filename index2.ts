import axios from "axios";
import cheerio, { AnyNode, BasicAcceptedElems } from "cheerio";

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
    const html = await axios.get("https://softca.tistory.com/471");
    let ulList: {} = [];

    const $ = cheerio.load(html.data);

    // const wordsList = $("div.tt_article_useless_p_margin table tbody");
    const wordsList = $("table tbody tr");
    let from = "";

    const translate = async (cont: string) => {
      // 서버실행 이전에 env path -> 개발환경으로 설정, env file 을 호출
      // dotEnv.config({ path: ".env.local", override: true });

      const config = {
        headers: {
          "X-Naver-Client-Id": "S3GDTg2lKCPUYCK7W0ky",
          "X-Naver-Client-Secret": "xC_9vS5aQi",
        },
      };

      await axios
        .post("https://openapi.naver.com/v1/papago/n2mt", { source: "en", target: "ko", text: cont }, config)
        .then((res) => {
          console.log(res);

          return res;
          // ja[differ] = res.data.message.result.translatedText;
          // // 경로 - 절대 경로로 설정, prettier 자동 세팅
          // fs.writeFile(
          //   "src/locales/ja/translation.json",
          //   prettier.format(JSON.stringify(ja), { filepath: "src/locales/ja/translation.json" }),
          //   (err) => console.log(err)
          // );
        })
        .catch((err) => {
          console.log({ err });
        });
    };
    wordsList.map((i, element) => {
      if ($(element).find("td:first-child").text() && i) {
        (ulList as any)[i] = {
          rank: i + 1,
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
          ex: $(element)
            .find("td:nth-child(4)")
            .text()
            .replace(/\s/g, "")
            .split(",")
            .map((el) => {
              if (el.includes("(")) {
                const [en, ko] = el.split("(");
                return { [en]: ko?.replace(")", "") };
              }
              return { [el]: translate(el) };
            }),
        };
      }
    });
    // fs.writeFile(
    //   "src/locales/ja/translation.json",
    //   prettier.format(JSON.stringify(ja), { filepath: "src/locales/ja/translation.json" }),
    //   (err) => console.log(err)
    // );
    console.log("bodyList : ", ulList);
  } catch (error) {
    console.error(error);
  }
};

getHtml();

// import axios from "axios";
// import fs from "fs";
// import cheerio, { AnyNode, BasicAcceptedElems } from "cheerio";

// const getHtml = async () => {
//   try {
//     // A : 471
//     // B : 472
//     // C : 473
//     // D : 474
//     // E : 475 // 여기서 차이생김
//     // F : 478
//     // G : 479
//     // H : 480
//     // I : 481
//     // J : 482
//     // K : 483
//     // L : 484
//     // M : 485
//     // N : 486
//     // ...
//     for (let i = 0; i < 21; i++) {
//       const en = [
//         "F",
//         "G",
//         "H",
//         "I",
//         "J",
//         "K",
//         "L",
//         "M",
//         "N",
//         "O",
//         "P",
//         "Q",
//         "R",
//         "S",
//         "T",
//         "U",
//         "V",
//         "W",
//         "X",
//         "Y",
//         "Z",
//       ];
//       const html = await axios.get(`https://softca.tistory.com/${478 + i}`);
//       let ulList: {} = [];

//       const $ = cheerio.load(html.data);

//       // const wordsList = $("div.tt_article_useless_p_margin table tbody");
//       const wordsList = $("table tbody tr");
//       let from = "";

//       const translate = async (cont: string) => {
//         // 서버실행 이전에 env path -> 개발환경으로 설정, env file 을 호출
//         // dotEnv.config({ path: ".env.local", override: true });

//         const config = {
//           headers: {
//             "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID,
//             "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET,
//           },
//         };

//         await axios
//           .post("https://openapi.naver.com/v1/papago/n2mt", { source: "en", target: "ko", text: cont }, config)
//           .then((res) => {
//             console.log(res);

//             return res;
//           })
//           .catch((err) => {
//             console.log({ err });
//           });
//       };
//       wordsList.map((i, element) => {
//         if ($(element).find("td:first-child").text() && i) {
//           (ulList as any)[i] = {
//             rank: i,
//             root: $(element).find("td:first-child").text(),
//             meaning: $(element).find("td:nth-child(2)").text().replace(/\s+/g, "").split(","),
//             origin: $(element)
//               .find("td:nth-child(3)")
//               .text()
//               .replace(/\s+/g, "")
//               .split(",")
//               .map((el) => {
//                 if (el.includes("from")) {
//                   const [w, f] = el.split("from");
//                   from = f;
//                   return w;
//                 }
//                 return el;
//               }),
//             from,
//             ex: $(element)
//               .find("td:nth-child(4)")
//               .text()
//               .replace(/\s/g, "")
//               .split(",")
//               .map((el) => {
//                 if (el.includes("(")) {
//                   const [en, ko] = el.split("(");
//                   return { [en]: ko?.replace(")", "") };
//                 }
//                 return { [el]: translate(el) };
//               }),
//           };
//         }
//       });
//       fs.writeFile(
//         `./${en[i]}.json`,
//         // prettier.format(JSON.stringify(ja), { filepath: "src/locales/ja/translation.json" }),
//         JSON.stringify(ulList),
//         (err) => console.log(err)
//       );
//       console.log("bodyList : ", ulList);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// getHtml();
