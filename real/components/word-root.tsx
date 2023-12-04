'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { T_Word } from '~/app/main/[[...slug]]/page';

export const WordRoot = (word: T_Word): JSX.Element => {
  const root = word.root?.replace(/\([^)]*\)/g, '');

  return (
    <Link className="word_root" href={`/main/A/${word.rank}`}>
      {root}
    </Link>
  );
};
