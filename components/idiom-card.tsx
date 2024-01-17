'use client';

import { useEffect, useRef, useState } from 'react';
import LocalStorage from '~/libs/localstorage';
import { randomIndex, randomIndexPerDay } from '~/libs/random-index';
import { PinIcon, RefreshIcon } from './icons/fun-icon';
import { Sounds } from './sounds-image';

interface Props {
  list: [string, string[]][];
}

export const IdiomCard = ({ list }: Props) => {
  const [randomIdiom, setRandomIdiom] = useState<[string, string[]]>();
  const savedIdiom = JSON.parse(LocalStorage.getItem('sI') as string);

  useEffect(() => {
    setRandomIdiom(savedIdiom || list[randomIndexPerDay(list.length)]);
  }, [savedIdiom?.[0]]);

  return (
    <>
      <h2 className="mb-4 flex font-serif text-gray-11">
        오늘의 숙어 및 단어
        <Sounds value={randomIdiom?.[0] as string} />
        <RefreshIcon
          className="ml-1 mt-1 block cursor-pointer transition-all hover:-rotate-180"
          onClick={(e) => {
            e.stopPropagation();
            setRandomIdiom(list[randomIndex(list.length)]);
            // e.currentTarget.children[0].setAttribute('fill', '#c40202ff');
          }}
        />
      </h2>
      <div className="border-gray-300 rounded border p-4">
        <div className="mb-2">
          <div className="flex items-center">
            <span className="block font-bold">{randomIdiom?.[0]}</span>
            <PinIcon
              className="ml-2 block cursor-pointer"
              onClick={(e) => {
                LocalStorage.setItem('sI', JSON.stringify(randomIdiom));
                e.currentTarget.children[0].setAttribute('fill', '#c40202ff');
              }}
              color={
                randomIdiom?.[0] === savedIdiom?.[0] ? '#c40202ff' : undefined
              }
            />
          </div>
          <div>
            {(randomIdiom?.[1] as string[])?.map((el) => {
              return (
                <div className="mt-1" key={el}>
                  {el}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
