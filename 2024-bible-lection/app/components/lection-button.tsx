'use client'

import React, { useState } from 'react'
import randomIndex from '@/app/components/random-index'
import Image from 'next/image'

interface Props {
  words: { [key in string]: string }[]
}

export const LectionButton = ({ words }: Props): JSX.Element => {
  const [modal, setModal] = useState(false)
  const target = words[randomIndex(words.length)]
  const images = ['kakao', 'url', 'imgdown', 'instagram']
  return (
    <>
      <div className="letter">
        <Image
          className="letter-back"
          src={`/images/letter-back.svg`}
          alt="back"
          width={530}
          height={132}
          loading="eager"
          priority
        />
        {modal && (
          <>
            <div className="modal">
              <Image
                className="line"
                src={`/images/line.svg`}
                alt="line"
                width={76}
                height={104}
                loading="eager"
                priority
              />
              <Image
                className="top"
                src={`/images/top_img.svg`}
                alt="top"
                width={110}
                height={110}
                loading="eager"
                priority
              />
              <div className="text_area">
                <p>{target.description}</p>
                <p>{target.from.replace(/[\(\)]/g, '')}</p>
              </div>
              <div className="sns_icon">
                {images.map((el) => {
                  return (
                    <Image
                      key={el}
                      className={el}
                      src={`/images/sns/${el}.svg`}
                      alt={el}
                      width={26}
                      height={25}
                      loading="eager"
                      priority
                    />
                  )
                })}
              </div>
              <Image
                className="bottom"
                src={`/images/bottom_img.svg`}
                alt="bottom"
                width={76}
                height={104}
                loading="eager"
                priority
              />
            </div>
          </>
        )}
        <Image
          className="letter-after"
          src={`/images/letter-after.svg`}
          alt="after"
          width={530}
          height={260}
          loading="eager"
          priority
        />
        <Image
          className="letter-cover"
          src={`/images/letter-cover.svg`}
          alt="cover"
          width={530}
          height={186}
          loading="eager"
          priority
          style={{
            transformOrigin: 'top center',
            transform: modal ? 'rotateX(-180deg)' : '',
          }}
        />
      </div>
      <button
        className="lection-button"
        onClick={() => {
          setModal(!modal)
        }}
      >
        2024 내게 주신 하나님의 말씀
      </button>
    </>
  )
}
