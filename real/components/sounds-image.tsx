'use client';

import { useState } from 'react';
import Image from 'next/image';
import speak from '~/libs/sounds';

export const Sounds = ({ value }: { value: string }): JSX.Element => {
  const [click, setClick] = useState(false);

  const speakSubmit = () => {
    speak({
      text: value,
      opt_prop: {
        rate: 1,
        pitch: 0.8,
        // lang: selectLang.options[selectLang.selectedIndex].value,
        lang: 'en-US',
      },
      momentWorking: {
        startFn() {
          setClick(true);
        },
        endFn() {
          setClick(false);
        },
      },
    });
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
        onClick={speakSubmit}
      />

      <i
        className={`ml-0.5 inline-block h-4 w-4 ${
          click ? `bg-[url('/img/sounds.svg')]` : ''
        } bg-contain bg-no-repeat`}
      />
    </div>
  );
};
