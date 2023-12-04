'use client';

import './block.scss';

import Link from 'next/link';

export const Block = (): JSX.Element => {
  const arr = Array.from({ length: 26 }, (v, i) => String.fromCharCode(i + 65)); // 알파벳
  return (
    <div className="block_wrapper" data-animate data-animate-stage={2}>
      {arr.map((el) => {
        return (
          <Link key={el} href={`/main/${el}`} className="block">
            {el}
          </Link>
        );
      })}
    </div>
  );
};
