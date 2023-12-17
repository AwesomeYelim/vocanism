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

const bible = async () => {
  const installment = [
    'kor-2pet/1:20-21',
    'kor-rev/22:18-19',
    'kor-num/23:19',
    'kor-1ki/8:39',
    'kor-isa/40:26',
    'kor-isa/45:18',
    'kor-neh/9:6',
    'kor-job/11:7-9',
    'kor-acts/17:24-25',
    'kor-1tim/6:15-16',
    'kor-1jn/1:5',
    'kor-1jn/4:16',
    'kor-deu/17:19',
    'kor-isa/34:16',
    'kor-psa/119:9',
    'kor-mat/4:4',
    'kor-john/1:1',
    'kor-john/5:39',
    'kor-rom/10:17',
    'kor-phi/2:16',
    'kor-2tim/3:16-17',
    'kor-2pet/3:16',
    'kor-2pet/1:20-21',
    'kor-rev/22:18-19',
    'kor-num/23:19',
    'kor-isa/40:26',
    'kor-isa/45:18',
    'kor-neh/9:6',
    'kor-job/11:7-9',
    'kor-acts/17:24-25',
    'kor-1tim/6:15-16',
    'kor-1jn/1:5',
    'kor-1jn/4:16',
    'kor-job/25:4-6',
    'kor-psa/39:4-5',
    'kor-psa/90:3-4',
    'kor-psa/90:10',
    'kor-psa/144:3-4',
    'kor-eccl/5:15-16',
    'kor-jas/4:14',
    'kor-psa/14:1',
    'kor-eccl/1:2-4',
    'kor-jas/1:9-10',
    'kor-prv/27:1',
    'kor-eccl/11:9',
    'kor-mat/3:12',
    'kor-acts/17:30-31',
    'kor-rom/14:11-12',
    'kor-mat/12:36-37',
    'kor-heb/4:13',
    'kor-heb/9:27-28',
    'kor-rom/2:6-8',
    'kor-rev/22:10-13',
    'kor-1th/2:10-12',
    'kor-exo/12:13',
    'kor-lev/17:11',
    'kor-isa/1:18',
    'kor-isa/38:17',
    'kor-isa/43:25',
    'kor-isa/44:22',
    'kor-isa/53:5-6',
    'kor-mic/7:19',
    'kor-2cor/5:21',
    'kor-col/1:13-14',
    'kor-heb/1:3',
    'kor-heb/9:12',
    'kor-1pet/2:24-25',
    'kor-heb/9:25-26',
    'kor-heb/10:17-18',
    'kor-dan/12:2-3',
    'kor-mat/7:13-14',
    'kor-john/3:16',
    'kor-john/5:24',
    'kor-john/6:40',
    'kor-john/10:28-29',
    'kor-john/11:25-26',
    'kor-john/17:3',
    'kor-rom/6:23',
    'kor-gal/6:7-8',
    'kor-john/16:13',
    'kor-gal/2:20',
    'kor-col/3:9-10',
    'kor-1th/5:23',
    'kor-jas/3:17-18',
    'kor-heb/12:6',
    'kor-2tim/2:20-21',
    'kor-psa/51:17',
    'kor-psa/145:18',
    'kor-jer/29:12-13',
    'kor-jer/33:3',
    'kor-mat/6:33',
    'kor-john/15:7',
    'kor-rom/8:26-27',
    'kor-phi/4:6-7',
    'kor-col/4:2-4',
    'kor-1tim/2:1-2',
    'kor-john/15:16',
    'kor-1jn/5:14-15',
    'kor-jas/1:5-6',
    'kor-mat/26:41',
    'kor-jas/5:13',
    'kor-isa/58:9',
    'kor-col/4:2',
    'kor-zep/1:6',
    'kor-isa/64:7',
    'kor-luke/22:40',
    'kor-psa/133',
    'kor-isa/41:10',
    'kor-prv/3:5-7',
    'kor-mat/20:27-28',
    'kor-rom/6:12-13',
    'kor-rom/8:5-9',
    'kor-1cor/1:9',
    'kor-1cor/15:57-58',
    'kor-2cor/2:14-16',
    'kor-2cor/4:7-10',
    'kor-gal/5:13-15',
    'kor-eph/4:15-16',
    'kor-phi/2:12-14',
    'kor-1th/5:14-15',
    'kor-jas/4:4',
    'kor-1jn/1:3',
    'kor-1jn/1:6-7',
    'kor-heb/10:9',
    'kor-mal/3:10',
    'kor-acts/4:19-20',
    'kor-rom/6:1-2',
    'kor-rom/8:12-14',
    'kor-rom/14:7-8',
    'kor-1cor/6:19-20',
    'kor-1cor/10:33',
    'kor-eph/4:22-24',
    'kor-eph/5:8-11',
    'kor-heb/12:8-10',
    'kor-rev/16:15',
  ]
  const list = await Promise.all(
    installment.map(async (el, i) => {
      try {
        const res = await axios.get(`http://ibibles.net/quote.php?${el}`)
        const html = res.data
        const $ = cheerio.load(html)

        const extractedText = $('body small').parent().text()
        // .match(/\d+:\d+\s+(.+)/gm)?.[1]

        return {
          chapter: el,
          des: extractedText,
        }
      } catch (error: any) {
        console.error(`Error fetching chapter ${el}:`, error.message)
        return null
      }
    }),
  )

  // Filter out null values (failed requests)
  const filteredList = list.filter((item) => item !== null)

  console.log(filteredList)

  fs.writeFile(
    `./data/bible-copy.json`,
    await prettier.format(JSON.stringify(filteredList), {
      filepath: `./data/bible-copy.json`,
    }),
    // JSON.stringify(ulList),
    (err) => console.log(err),
  )
}

bible()
