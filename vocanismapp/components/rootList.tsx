'use client';

import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import useSearch from '~/app/libs/hooks/useSearch';
import { T_Word } from '~/app/main/[[...slug]]/page';
import { SearchInput } from './searchInput';
import { WordRoot } from './word-root';

interface Props {
  res: T_Word[];
  slug: string;
}

export const RootList = (props: Props): JSX.Element => {
  const { res, slug } = props;
  const { searchHandler, searchValue } = useSearch();
  const [list, setList] = useState<T_Word[]>(res);
  /**
   * - value 값에 반응하여 검색어 입력시 반응되는 list 들
   */
  useEffect(() => {
    const filteredExData = cloneDeep(res)
      .flatMap((item) => Object.keys(item.ex))
      .filter((item) => item.includes(searchValue));

    const filteredResData = cloneDeep(res).filter((el) => {
      const exTarget = Object.keys(el.ex).filter((el) =>
        filteredExData.includes(el),
      );
      const exData = filteredExData.find((item) => {
        return Object.keys(el.ex).includes(item);
      });

      return !!exTarget?.length || !!exData;
    });

    setList(filteredResData);
  }, [searchValue]);

  return (
    <>
      <SearchInput res={res} onChange={searchHandler} />
      {list.map((word: T_Word) => {
        const props = { word, slug };
        return <WordRoot key={JSON.stringify(word)} {...props} />;
      })}
    </>
  );
};
