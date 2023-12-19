import { allNotes, allWritings } from 'contentlayer/generated';
import Link from 'next/link';

import { Block } from '~/components/block';
import {
  GithubIcon,
  NotionIcon,
  TwitterXIcon,
} from '~/components/icons/logo-icon';
import { filterDraft, sortDateDesc } from '~/libs/mdx';

export default function Home() {
  return (
    <div className="w-80">
      {/* <h2 className="mb-4 font-serif text-gray-11">수첩</h2> */}
      {/* {allNotes
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
      })} */}
      <Link href="/note" className="link block text-gray-11">
        note
      </Link>
      <Link href="/main" className="link block text-gray-11">
        main
      </Link>
    </div>
  );
}
