'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { T_Word } from '~/app/main/[[...slug]]/page';

interface Props {
  word: T_Word;
  slug: string;
}

export const WordRoot = ({ word, slug }: Props): JSX.Element => {
  const root = word.root?.replace(/\([^)]*\)/g, '');

  return (
    <Link className="word_root" href={`/main/${slug}/${word.rank}`}>
      {root}
    </Link>
  );
};
