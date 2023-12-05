'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { T_Word } from '~/app/main/[[...slug]]/page';

export const Detail = (word: T_Word): JSX.Element => {
  const { ex, from, meaning, origin, rank, root } = word;
  return (
    <div className="border-gray-300 rounded border p-4">
      <p className="mb-2">
        <span className="font-bold">▸ Etymology:</span> {root}
      </p>
      <p className="mb-2">
        <span className="font-bold">▸ Meaning:</span> {meaning.join(', ')}
      </p>
      <p className="mb-2">
        <span className="font-bold">▸ From:</span> {from}
      </p>
      <p className="mb-2">
        <span className="font-bold">▸ Origin:</span> {origin.join(', ')}
      </p>
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
