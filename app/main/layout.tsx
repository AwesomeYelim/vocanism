import Link from 'next/link';
import { ReactNode } from 'react';
import { Block } from '~/components/block';
import { IdiomCard } from '~/components/idiom-card';
import { TargetwordsCard } from '~/components/targetwords-card';
import { readFile } from '~/service/words';

type Props = {
  children: ReactNode;
};
export default function MainLayout({ children }: Props) {
  const idiomsData = Object.entries(readFile('idioms', 'data')) as [
    string,
    string[],
  ][];

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
          <IdiomCard list={idiomsData} />
          <TargetwordsCard />
        </div>
      </div>
    </main>
  );
}
