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

  return (
    <>
      <button
        className="lection-button"
        onClick={() => {
          setModal(!modal)
        }}
      >
        2024 내게 주신 하나님의 말씀
      </button>
      <div className="letter">
        <Image
          className="letter-back"
          src={`/images/letter-back.svg`}
          alt="back"
          width={500}
          height={500}
          loading="eager"
          priority
        />
        {modal && (
          <>
            <div className="modal">
              {target.description}
              <br />
              {target.from.replace(/[\(\)]/g, '')}
            </div>
          </>
        )}
        <Image
          className="letter-after"
          src={`/images/letter-after.svg`}
          alt="after"
          width={500}
          height={500}
          loading="eager"
          priority
        />
        <Image
          className="letter-cover"
          src={`/images/letter-cover.svg`}
          alt="cover"
          width={500}
          height={500}
          loading="eager"
          priority
          style={{
            transform: modal ? 'translateY( -30%) rotateX(-180deg)' : '',
          }}
        />
      </div>
    </>
  )
}
