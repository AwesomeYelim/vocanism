import Link from 'next/link';
import { ReactNode } from 'react';
import { Block } from '~/components/block';
import { IdiomSounds } from '~/components/idiomSounds';
import { readFile } from '~/service/words';

type Props = {
  children: ReactNode;
};
export default function MainLayout({ children }: Props) {
  const data = Object.entries(readFile('idiom'));
  const randomIndex = Math.floor(Math.random() * data.length);

  return (
    <main className="text-tx">
      <Link href="/" className="mb-7 block font-serif font-semibold">
        Dictionary
      </Link>
      <p className="mb-3" data-animate data-animate-stage={1}>
        <span className="font-serif font-semibold">영어 어근</span> 과 관련된
        사전을 제작하고 있습니다.
        <br />
      </p>
      <Block />
      <div data-animate data-animate-stage={3} className="mt-12 flex gap-8">
        <div className="w-80">
          <h2 className="mb-4 font-serif text-gray-11">오늘의 어근</h2>
          {children}

          <Link href="/main" className="link inline-block text-gray-11">
            ...
          </Link>
        </div>
        <div className="w-80">
          <>
            <h2 className="mb-4 inline-block font-serif text-gray-11">
              오늘의 숙어 및 단어
            </h2>
            <IdiomSounds value={data[randomIndex][0]} />
            <div className="border-gray-300 rounded border p-4">
              <div className="mb-2">
                <span className="block min-w-[90px] font-bold">
                  {data[randomIndex][0]}
                </span>
                <div>
                  {(data[randomIndex][1] as string[]).map((el) => {
                    return <div>{el}</div>;
                  })}
                </div>
              </div>
            </div>
          </>
          <>
            <h2 className="mb-4 mt-4 font-serif text-gray-11">
              오늘의 목표 단어
            </h2>
            <div className="border-gray-300 rounded border p-4">
              <div className="mb-2">
                <span className="block min-w-[90px] font-bold">
                  {data[randomIndex + 1][0]}
                </span>
                <div>
                  {(data[randomIndex + 1][1] as string[]).map((el) => {
                    return <div>{el}</div>;
                  })}
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </main>
  );
}
