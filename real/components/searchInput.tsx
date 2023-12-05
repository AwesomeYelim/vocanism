'use client';

import React, { useState } from 'react';
import useSearch from '~/app/libs/hooks/useSearch';
import { T_Word } from '~/app/main/[[...slug]]/page';

interface Props {
  res: T_Word[];
}

export const SearchInput = (props: React.ComponentProps<'input'> & Props) => {
  const { res, ...rest } = props;

  const submitHandler = async (e: KeyboardEvent) => {
    e.stopPropagation();

    const target = (e.target as EventTarget & { value: string }).value;
    try {
      //   const postData = await getWords(target);
      //   console.log(postData);
    } catch (error) {}
  };

  return (
    <>
      <input {...rest} placeholder="어근을 입력하세요" />
    </>
  );
};
