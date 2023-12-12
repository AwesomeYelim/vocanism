/**
 * 1. 컴포넌트 : dataCombine.ts
 * 2. 작성일 : 2023.12.07 / 15시 10분 06초
 * 3. 작성자 : 홍예림
 * 4. 설명 : 기존 root data 합치는 함수
 */

import { cloneDeep } from 'lodash'
import fs from 'fs'
import prettier from 'prettier'
import cheerio from 'cheerio'
import { IS } from './naverReqDicAddDetail'
import axios from 'axios'

const naverCrawDicFn = async () => {
  try {
    const readFile = (arg: string) => {
      const words = fs.readFileSync(`./data/${arg}.json`, 'utf-8')
      return JSON.parse(words)
    }
    const idiomObj = readFile('bible-lection')
    // const filtered = [
    //   ...new Set(
    //     idiomObj
    //       .filter((el: any) => !el.description)
    //       .map((el: any) => el.from.match(/[가-힣]+/)[0]),
    //   ),
    // ]

    // const detailObj = readFile('detailIdiom')
    // const copyobj = cloneDeep(detailObj);
    const obj = {
      창: 'ge',
      출: 'exo',
      레: 'lev',
      민: 'num',
      신: 'deu',
      수: 'josh',
      삿: 'jdgs',
      룻: 'ruth',
      삼상: '1sm',
      삼하: '2sm',
      왕상: '1ki',
      왕하: '2ki',
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
      사: 'isa',
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
      습: 'zep',
      학: 'hag',
      슥: 'zec',
      말: 'mal',
      마: 'mat',
      막: 'mark',
      눅: 'luke',
      요: 'john',
      행: 'acts',
      롬: 'rom',
      고전: '1cor',
      고후: '2cor',
      갈: 'gal',
      엡: 'eph',
      빌: 'phi',
      골: 'col',
      살전: '1th',
      살후: '2th',
      딤전: '1tim',
      딤후: '2tim',
      딛: 'titus',
      몬: 'phmn',
      히: 'heb',
      약: 'jas',
      벧전: '1pet',
      벧후: '2pet',
      요일: '1jn',
      요이: '2jn',
      요삼: '3jn',
      유: 'jude',
      계: 'rev',
    }

    const copyLection = await Promise.all(
      cloneDeep(idiomObj)?.map(async (el: IS) => {
        const from = el.from.match(/[가-힣]+/)[0] as keyof typeof obj
        const { description } = el
        const chapter = (() => {
          if (el.from.includes(':')) {
            if (el.from.includes('~')) {
              return el.from.match(/\b\d+:\d+~\d+\b/)[0].replace('~', '-')
            } else if (el.from.includes('-')) {
              return el.from.match(/\b\d+:\d+-\d+\b/)[0]
            } else {
              return el.from.match(/\b\d+:+\d+/)[0]
            }
          }
        })()

        if (!el.description) {
          const description = (async () => {
            if (!obj[from] || !chapter) return

            try {
              const html = await axios
                .get(`http://ibibles.net/quote.php?kor-${obj[from]}/${chapter}`)
                .then((res) => res.data)
                .catch((err) => {
                  console.log({ err })
                })
              const $ = cheerio.load(html)
              const extractedText = $('body small')
                .parent()
                .text()
                .match(/\d+:\d+\s+(.+)/)?.[1]
              return extractedText
            } catch (error: any) {
              console.error(`Error fetching chapter ${el}:`, error.message)
              return null
            }
          })()
          console.log(description)

          return {
            ...el,
            description,
          }
        }
        return {
          ...el,
          description,
        }
      }),
    )
    console.log(copyLection)

    // fs.writeFile(
    //   `./data/copylection.json`,
    //   await prettier.format(JSON.stringify(copyLection), {
    //     filepath: `./data/copylection.json`,
    //   }),
    //   // JSON.stringify(ulList),
    //   (err) => console.log(err),
    // )
  } catch (error) {
    console.log(error)
  }
}
naverCrawDicFn()
