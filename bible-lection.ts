/**
 * 1. 컴포넌트 : test.ts
 * 2. 작성일 : 2023.12.08 / 17시 10분 10초
 * 3. 작성자 : 홍예림
 * 4. 설명 : 성경 api 호출
 */

import axios from "axios";
import fs from "fs";
import cheerio from "cheerio";
import prettier from "prettier";
import { IS } from "./naverReqDicAddDetail";

export const randomIndex = (argLength: number) => Math.floor(Math.random() * argLength);

// ge (창세기)
//  exo (출애굽기)
//  lev (레위기)
//  num (민수기)
//  deu (신명기)
//  josh (여호수아)
//  jdgs (사사기)
//  ruth (룻기)
//  1sm (사무엘상)
//  2sm (사무엘하)
//  1ki (열왕기상)
//  2ki (열왕기하)
//  1chr (역대상)
//  2chr (역대하)
//  ezra (에스라)
//  neh (느헤미야)
//  est (에스더)
//  job (욥기)
//  psa (시편)
//  prv (잠언)
//  eccl (전도서)
//  ssol (아가)
//  isa (이사야)
//  jer (예레미야)
//  lam (예레미야 애가)
//  eze (에스겔)
//  dan (다니엘)
//  hos (호세아)
//  joel (요엘)
//  amos (아모스)
//  obad (오바댜)
//  jonah (요나)
//  mic (미가)
//  nahum (나훔)
//  hab (하박국)
//  zep (스바냐)
//  hag (학개)
//  zep (스가랴)
//  mal (말라기)
//  mat (마태복음)
//  mark 마가복음)
//  luke (누가복음)
//  john (요한복음)
//  acts (사도행전)
//  rom (로마서)
//  1cor (고린도전서)
//  2cor (고린도후서)
//  gal (갈라디아서)
//  eph (에베소서)
//  phi (빌립보서)
//  col (골로새서)
//  1th (데살로니가전서)
//  2th (데살로니가후서)
//  1tim (디모데전서)
//  2tim (디모데후서)
//  titus (디도서)
//  phmn (빌레몬서)
//  heb (히브리서)
//  jas (야고보서)
//  1pet (베드로전서)
//  2pet (베드로후서)
//  1jn (요한1서)
//  2jn (요한2서)
//  3jn (요한3서)
//  jude (유다서)
//  rev (요한계시록)
const bible = async () => {
  const installment = [
    "ge",
    "exo",
    "lev",
    "num",
    "deu",
    "josh",
    "jdgs",
    "ruth",
    "1sm",
    "2sm",
    "1ki",
    "2ki",
    "1chr",
    "2chr",
    "ezra",
    "neh",
    "est",
    "job",
    "psa",
    "prv",
    "eccl",
    "ssol",
    "isa",
    "jer",
    "lam",
    "eze",
    "dan",
    "hos",
    "joel",
    "amos",
    "obad",
    "jonah",
    "mic",
    "nahum",
    "hab",
    "zep",
    "hag",
    "zep",
    "mal",
    "mat",
    "mark",
    "luke",
    "john",
    "acts",
    "rom",
    "1cor",
    "2cor",
    "gal",
    "eph",
    "phi",
    "col",
    "1th",
    "2th",
    "1tim",
    "2tim",
    "titus",
    "phmn",
    "heb",
    "jas",
    "1pet",
    "2pet",
    "1jn",
    "2jn",
    "3jn",
    "jude",
    "rev",
  ];
  // await axios
  //   .get("http://ibibles.net/quote.php?kor-mat/5:3")
  //   .then((res) => {
  //     console.log(res.data);

  //     return res;
  //   })
  //   .catch((err) => {
  //     console.log({ err });
  //   });
  let ulList: IS = [];

  for (let i = 0; i < 10; i++) {
    const html = await axios.get(`https://www.jbch.org/kor/research/list.php?sCode=10r12r17r10&strKeyword=&page=${i}`);

    const $ = cheerio.load(html.data);

    // const wordsList = $("div.tt_article_useless_p_margin table tbody");
    const wordsList = $("ul.lists li.plnor");
    // console.log(wordsList);

    wordsList.map((i, element) => {
      ulList = [
        ...ulList,
        {
          category: $(element).find(".fleft").text(),
          description: $(element).find(".descript p").text(),
          from: $(element).find("font").text().replace(/\s/g, ""),
        },
      ];
    });
  }

  fs.writeFile(
    `./data/bible-lection.json`,
    await prettier.format(JSON.stringify(ulList), { filepath: `./data/bible-lection.json` }),
    // JSON.stringify(ulList),
    (err) => console.log(err)
  );
};

bible();
