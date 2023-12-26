'use client'

import React, { useState } from 'react'
import randomIndex from '@/app/components/random-index'

interface Props {
  words: { [key in string]: string }[]
}

export const LectionButton = ({ words }: Props): JSX.Element => {
  const [modal, setModal] = useState(false)
  const target = words[randomIndex(words.length)]
  console.log(target)

  return (
    <>
      {modal && <div className="modal">{target.description}</div>}
      <div
        className="book"
        onClick={() => {
          setModal(!modal)
        }}
      >
        2024 내게 주신 하나님의 말씀
      </div>
    </>
  )
}
