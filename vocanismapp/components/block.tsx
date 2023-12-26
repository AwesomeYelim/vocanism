'use client';

import Link from 'next/link';

export const Block = (): JSX.Element => {
  const arr = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)); // 알파벳
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      data-animate
      data-animate-stage={2}
    >
      {arr.map((el) => {
        return (
          <Link
            className="pt-0.4 h-6 w-10 cursor-pointer rounded border-r-0 bg-gray-6 pb-0.5 pl-2 pr-2 text-center align-middle"
            key={el}
            href={`/main/${el}`}
          >
            {el}
          </Link>
        );
      })}
    </div>
  );
};
