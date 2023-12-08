'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const Sounds = ({ value }: { value: string }): JSX.Element => {
  const [click, setClick] = useState(false);
  const speak = (
    text: string,
    opt_prop: {
      rate: number;
      pitch: number;
      // lang: selectLang.options[selectLang.selectedIndex].value,
      lang: 'en-US';
    },
  ) => {
    if (
      typeof SpeechSynthesisUtterance === 'undefined' ||
      typeof window.speechSynthesis === 'undefined'
    ) {
      alert('이 브라우저는 음성 합성을 지원하지 않습니다.');
      return;
    }

    window.speechSynthesis.cancel(); // 현재 읽고있다면 초기화

    const prop = opt_prop || {};

    const speechMsg = new SpeechSynthesisUtterance();
    speechMsg.rate = prop.rate || 1; // 속도: 0.1 ~ 10
    speechMsg.pitch = prop.pitch || 1; // 음높이: 0 ~ 2
    speechMsg.lang = prop.lang || 'ko-KR';
    speechMsg.text = text;

    // SpeechSynthesisUtterance에 저장된 내용을 바탕으로 음성합성 실행
    setClick(true);
    window.speechSynthesis.speak(speechMsg);

    speechMsg.onend = () => {
      setClick(false);
    };
  };
  return (
    <div className="flex items-center">
      <Image
        src={`/img/volume.svg`}
        alt="img"
        width={10}
        height={15}
        loading="eager"
        priority
        className="ml-2 inline-block cursor-pointer"
        onClick={() => {
          speak(value, {
            rate: 1,
            pitch: 0.8,
            // lang: selectLang.options[selectLang.selectedIndex].value,
            lang: 'en-US',
          });
        }}
      />
      {click && (
        <i className="ml-0.5 inline-block h-4 w-4 bg-[url('/img/sounds.svg')] bg-contain bg-no-repeat" />
      )}
    </div>
  );
};
