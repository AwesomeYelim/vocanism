import Image from 'next/image'
import { LectionButton } from '@/app/components/lection-button'
import { getLection } from '@/service/words'
import './page.scss'

export default async function Home() {
  const words = await getLection()
  console.log(words)

  return (
    <>
      <body>
        <div className="bookshelf">
          <LectionButton words={words} />
        </div>
      </body>
    </>
  )
}
