'use client';

import { useEffect, useState } from 'react';
import { randomIndex, randomIndexPerDay } from '~/libs/random-index';
import { Refresh } from './refresh-image';
import { Sounds } from './sounds-image';

interface Props {
  list: [string, string[]][];
}

export const IdiomCard = ({ list }: Props) => {
  const [randomIdiom, setRandomIdiom] = useState<[string, string[]]>();

  useEffect(() => {
    setRandomIdiom(list[randomIndexPerDay(list.length)]);
  }, []);

  return (
    <>
      <h2 className="mb-4 flex font-serif text-gray-11">
        오늘의 숙어 및 단어
        <Sounds value={randomIdiom?.[0] as string} />
        <Refresh
          handler={() => {
            setRandomIdiom(list[randomIndex(list.length)]);
          }}
        />
      </h2>
      <div className="border-gray-300 rounded border p-4">
        <div className="mb-2">
          <span className="block min-w-[90px] font-bold">
            {randomIdiom?.[0]}
          </span>
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
