import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';

export default function useSearch(
  callback?: (value: string) => void,
  wait = 100,
) {
  const [searchValue, setSearchValue] = useState('');

  const searchHandler = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      callback?.(value);
      setSearchValue(value);
    }, wait),
    [],
  );

  return { searchValue, searchHandler };
}
