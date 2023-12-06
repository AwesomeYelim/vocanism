import Link from 'next/link';
import { ReactNode } from 'react';
import { readFile } from '~/service/words';

type Props = {
  children: ReactNode;
};
export default function layout({ children }: Props) {
  const data = Object.entries(readFile('idiom'));
  const randomIndex = Math.floor(Math.random() * data.length);

  return (
    <div data-animate data-animate-stage={3} className="mt-12 flex gap-8">
      <div className="w-80">
        <h2 className="mb-4 font-serif text-gray-11">오늘의 어근</h2>
        {children}

        <Link href="/main" className="link inline-block text-gray-11">
          ...
        </Link>
      </div>
      <div className="w-80">
        <h2 className="mb-4 font-serif text-gray-11">오늘의 숙어</h2>
        <div className="border-gray-300 rounded border p-4">
          <div className="mb-2">
            <span className="block min-w-[90px] font-bold">
              {data[randomIndex][0]}
            </span>
            <div>{(data[randomIndex] as string[])[1]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
