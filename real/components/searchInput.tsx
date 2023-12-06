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
      <input
        className="rounded-lg bg-gray-3 pb-1 pl-2 pt-1"
        {...rest}
        placeholder="어근을 입력하세요"
      />
    </>
  );
};
