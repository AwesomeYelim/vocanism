'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { T_Word } from '~/app/main/[[...slug]]/page';

export const Detail = (word: T_Word): JSX.Element => {
  const { ex, from, meaning, origin, rank, root } = word;
  const staticScr = [
    { text: '▸ Etymology:', value: root || '-' },
    {
      text: '▸ Meaning:',
      value:
        (typeof meaning === 'object' ? meaning.join(', ') : meaning) || '-',
    },
    { text: '▸ From:', value: from || '-' },
    { text: '▸ Origin:', value: origin.join(', ') || '-' },
  ];
  return (
    <div className="border-gray-300 rounded border p-4">
      {staticScr.map((item) => {
        return (
          <p className="mb-2" key={JSON.stringify(item)}>
            <span className="font-bold">{item.text}</span> {item.value}
          </p>
        );
      })}
      <div className="mb-2 flex">
        <span className="block min-w-[90px] font-bold">▸ Example:</span>
        <div>
          {Object.entries(ex).map(([k, v]: [string, string]) => (
            <p key={k} className="ml-2">
              {k} : {v}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
