import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Block } from '~/components/block';

type Props = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Props): JSX.Element => {
  //
  return (
    <>
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
        {children}
      </main>
    </>
  );
};
