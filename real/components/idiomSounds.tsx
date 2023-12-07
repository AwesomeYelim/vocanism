'use client';

import React from 'react';
import Image from 'next/image';

export const IdiomSounds = ({ value }: { value: string }): JSX.Element => {
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
    window.speechSynthesis.speak(speechMsg);
  };
  return (
    <>
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
    </>
  );
};
