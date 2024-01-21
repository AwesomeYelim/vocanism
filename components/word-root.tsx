'use client';

import Link from 'next/link';
import React from 'react';
import { type T_Word } from '~/app/main/[[...slug]]/page';

interface Props {
  word: T_Word;
  slug: string;
}

export const WordRoot = ({ word, slug }: Props): JSX.Element => {
  const root = word.root?.replace(/\([^)]*\)/g, '');

  return (
    <Link
      className="cursor-pointer rounded border border-gray-6 bg-gray-2 p-1 text-black transition-all duration-200 ease-in-out hover:border-transparent  hover:bg-gray-5 hover:text-white"
      href={`/main/${slug}/${word.rank}`}
    >
      {root}
    </Link>
  );
};
