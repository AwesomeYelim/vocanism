'use client';

import { useEffect, useState } from 'react';
import { randomIndex, randomIndexPerDay } from '~/libs/random-index';
import { Refresh } from './refresh-image';
import { WordNote } from './word-note';

interface Props {
  list: [string, unknown][];
}

export const TargetwordsCard = ({ list }: Props) => {
  const randomNum = [randomIndexPerDay(list.length), randomIndex(list.length)];
  const randomTodayWords = (randomKey: number) =>
    list.slice(randomKey, randomKey + 10) as [string, string[]][];
  const [wordList, setWordList] = useState<[string, string[]][]>();

  useEffect(() => {
    setWordList(randomTodayWords(randomNum[0]));
  }, []);

  return (
    <>
      <h2 className="mb-4 mt-4 font-serif text-gray-11">
        오늘의 목표 단어
        <Refresh
          handler={() => {
            setWordList(randomTodayWords(randomNum[1]));
          }}
        />
      </h2>
      <WordNote wordList={wordList as [string, string[]][]} />
    </>
  );
};
