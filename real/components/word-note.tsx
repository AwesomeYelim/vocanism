'use client';

import { Fragment } from 'react';

interface Props {
  data?: number;
}

export const WordNote = ({
  wordList,
}: {
  wordList: [string, string[]][];
}): JSX.Element => {
  return (
    <div className="border-gray-300 rounded border p-4">
      <div className="mb-2">
        {wordList.map((word) => {
          return (
            <Fragment key={JSON.stringify(word)}>
              <span className="block min-w-[90px] font-bold">{word[0]}</span>
              <div>
                {word[1].map((el) => {
                  return <div key={el}>{el}</div>;
                })}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
