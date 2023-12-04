'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { T_Word } from '~/app/main/[[...slug]]/page';

export const Detail = (word: T_Word): JSX.Element => {
  return <>{word.meaning}</>;
};
