import { allNotes, allWritings } from 'contentlayer/generated';
import Link from 'next/link';

import { Block } from '~/components/Block';
import {
  GithubIcon,
  NotionIcon,
  TwitterXIcon,
} from '~/components/icons/logo-icon';
import { filterDraft, sortDateDesc } from '~/libs/mdx';

export default function Home() {
  return (
    <main className="text-tx">
      <h1 className="mb-7 font-serif font-semibold">Dictionary</h1>
      <p data-animate data-animate-stage={1}>
        <span className="font-serif font-semibold">어근</span> 과 관련된 사전을
        제작하고 있습니다.
        <br />
      </p>
      <Block />
      <div data-animate data-animate-stage={3} className="mt-12 flex gap-8">
        <div className="w-80">
          <h2 className="mb-4 font-serif text-gray-11">오늘의 사전</h2>
          {allWritings
            .filter(filterDraft)
            .sort(sortDateDesc)
            .slice(0, 3)
            .map((post, i) => {
              return (
                <div key={i} className="mb-4">
                  <Link href={post.href} className="link">
                    {post.title}
                  </Link>
                  <p className="mt-0.5 text-sm text-gray-11">
                    {post.description}
                  </p>
                </div>
              );
            })}
          <Link href="/writing" className="link inline-block text-gray-11">
            ...
          </Link>
        </div>
        <div className="w-80">
          <h2 className="mb-4 font-serif text-gray-11">수첩</h2>
          {allNotes
            .filter(filterDraft)
            .sort(sortDateDesc)
            .slice(0, 5)
            .map((post, i) => {
              return (
                <div key={i} className="mb-1">
                  <Link href={post.href} className="link">
                    {post.title}
                  </Link>
                </div>
              );
            })}
          <Link href="/note" className="link inline-block text-gray-11">
            ...
          </Link>
        </div>
      </div>
    </main>
  );
}
