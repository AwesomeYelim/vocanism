/**
 * 1. 컴포넌트 : test.ts
 * 2. 작성일 : 2023.12.08 / 17시 10분 10초
 * 3. 작성자 : 홍예림
 * 4. 설명 : 성경 api 호출
 */

import axios from 'axios'
import fs from 'fs'
import cheerio from 'cheerio'
import prettier from 'prettier'
import { IS } from './naverReqDicAddDetail'

export const randomIndex = (argLength: number) =>
  Math.floor(Math.random() * argLength)

const obj = {
  창: 'ge',
  출: 'exo',
  레: 'lev',
  민: 'num',
  신: 'deu',
  수: 'josh',
  사: 'jdgs',
  룻: 'ruth',
  삼상: '1sm',
  삼하: '2sm',
  열상: '1ki',
  열하: '2ki',
  역상: '1chr',
  역하: '2chr',
  에: 'ezra',
  느: 'neh',
  겔: 'est',
  욥: 'job',
  시: 'psa',
  잠: 'prv',
  전: 'eccl',
  아: 'ssol',
  이: 'isa',
  렘: 'jer',
  렘가: 'lam',
  더: 'eze',
  단: 'dan',
  호: 'hos',
  엘: 'joel',
  암: 'amos',
  오: 'obad',
  욘: 'jonah',
  미: 'mic',
  나: 'nahum',
  하: 'hab',
  스: 'zep',
  학: 'hag',
  //  "zep" :"스가랴",
  말: 'mal',
  마: 'mat',
  막: 'mark',
  누: 'luke',
  요: 'john',
  행: 'acts',
  롬: 'rom',
  고전: '1cor',
  고후: '2cor',
  갈: 'gal',
  엡: 'eph',
  빌: 'phi',
  골: 'col',
  데전: '1th',
  데후: '2th',
  딤전: '1tim',
  딤후: '2tim',
  딛: 'titus',
  몬: 'phmn',
  히: 'heb',
  야: 'jas',
  벧전: '1pet',
  벧후: '2pet',
  요일: '1jn',
  요이: '2jn',
  요삼: '3jn',
  유: 'jude',
  계: 'rev',
}
const bible = async () => {
  // const installment = [
  //   'ge',
  //   'exo',
  //   'lev',
  //   'num',
  //   'deu',
  //   'josh',
  //   'jdgs',
  //   'ruth',
  //   '1sm',
  //   '2sm',
  //   '1ki',
  //   '2ki',
  //   '1chr',
  //   '2chr',
  //   'ezra',
  //   'neh',
  //   'est',
  //   'job',
  //   'psa',
  //   'prv',
  //   'eccl',
  //   'ssol',
  //   'isa',
  //   'jer',
  //   'lam',
  //   'eze',
  //   'dan',
  //   'hos',
  //   'joel',
  //   'amos',
  //   'obad',
  //   'jonah',
  //   'mic',
  //   'nahum',
  //   'hab',
  //   'zep',
  //   'hag',
  //   'zep',
  //   'mal',
  //   'mat',
  //   'mark',
  //   'luke',
  //   'john',
  //   'acts',
  //   'rom',
  //   '1cor',
  //   '2cor',
  //   'gal',
  //   'eph',
  //   'phi',
  //   'col',
  //   '1th',
  //   '2th',
  //   '1tim',
  //   '2tim',
  //   'titus',
  //   'phmn',
  //   'heb',
  //   'jas',
  //   '1pet',
  //   '2pet',
  //   '1jn',
  //   '2jn',
  //   '3jn',
  //   'jude',
  //   'rev',
  // ]
  // await axios
  //   .get("http://ibibles.net/quote.php?kor-mat/5:3")
  //   .then((res) => {
  //     console.log(res.data);

  //     return res;
  //   })
  //   .catch((err) => {
  //     console.log({ err });
  //   });
  let ulList: IS = []

  for (let i = 0; i < 10; i++) {
    const html = await axios.get(
      `https://www.jbch.org/kor/research/list.php?sCode=10r12r17r10&strKeyword=&page=${i}`,
    )

    const $ = cheerio.load(html.data)

    // const wordsList = $("div.tt_article_useless_p_margin table tbody");
    const wordsList = $('ul.lists li.plnor')
    // console.log(wordsList);

    wordsList.map((i, element) => {
      ulList = [
        ...ulList,
        {
          category: $(element).find('.fleft').text(),
          description: $(element).find('.descript p').text(),
          from: $(element).find('font').text().replace(/\s/g, ''),
        },
      ]
    })
  }

  fs.writeFile(
    `./data/bible-lection.json`,
    await prettier.format(JSON.stringify(ulList), {
      filepath: `./data/bible-lection.json`,
    }),
    // JSON.stringify(ulList),
    (err) => console.log(err),
  )
}

bible()
