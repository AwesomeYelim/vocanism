'use client';

import React from 'react';
import { T_Word } from '~/app/main/[[...slug]]/page';

interface Props {
  res: T_Word[];
}

export const SearchInput = (props: React.ComponentProps<'input'> & Props) => {
  const { res, ...rest } = props;

  return (
    <>
      <input {...rest} placeholder="어근을 입력하세요" />
    </>
  );
};
