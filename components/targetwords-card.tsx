'use client';

import { useEffect, useState } from 'react';
import { randomIndex, randomIndexPerDay } from '~/libs/random-index';
import { RefreshIcon } from './icons/fun-icon';
import Select, { SingleValue } from 'react-select';
import { WordNote } from './word-note';

interface Option {
  value: string;
  label: string;
}

export const TargetwordsCard = () => {
  const [wordList, setWordList] = useState<[string, string[]][]>([]);
  const [directories, setDirectories] = useState<{
    target: Option;
    list: Option[];
  }>();

  const randomNum = [
    randomIndexPerDay(wordList.length),
    randomIndex(wordList.length),
  ];

  const randomTodayWords = (randomKey: number) =>
    wordList.slice(randomKey, randomKey + 10) as [string, string[]][];

  useEffect(() => {
    // 서버에서 디렉토리 목록을 받아오기
    const fetchDirectories = async () => {
      const res = await fetch('/api/directories');
      const dirs = await res.json();

      const options = dirs.map((dir: string) => ({
        value: dir,
        label: dir,
      }));
      setDirectories({ target: options[0], list: options });
    };

    fetchDirectories();
    setWordList(randomTodayWords(randomNum[0]));
  }, []);

  useEffect(() => {
    if (directories?.target.value) {
      const fetchWords = async () => {
        const res = await fetch(`/api/words?dir=${directories.target.value}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch words, status: ${res.status}`);
        }

        const body = await res.json();
        const wordEntries = Object.entries(body.res);
        const randomKey = randomIndexPerDay(wordEntries.length);
        const resWordList = wordEntries.slice(randomKey, randomKey + 10) as [
          string,
          string[],
        ][];
        setWordList(resWordList);
      };

      fetchWords();
    }
  }, [directories?.target]);

  const handleSelectChange = (selectedOption: SingleValue<Option>) => {
    setDirectories({
      target: selectedOption as Option,
      list: directories?.list as Option[],
    });
  };

  return (
    <>
      <h2 className="mb-4 mt-4 font-serif text-gray-11">
        오늘의 목표 단어
        <RefreshIcon
          className="ml-2 inline-block cursor-pointer transition-all hover:-rotate-180"
          onClick={() => {
            setWordList(randomTodayWords(randomNum[1]));
          }}
        />
        <Select
          className="ml-4 inline-block"
          options={directories?.list}
          onChange={handleSelectChange}
          value={directories?.target}
        />
      </h2>
      <WordNote wordList={wordList as [string, string[]][]} />
    </>
  );
};
