'use client';

import { ReactNode } from 'react';
import { atom, RecoilRoot } from 'recoil';

type Props = {
  children: ReactNode;
};

export const postsAtom = atom({
  key: 'etymology',
  default: [],
});

export default function Recoil({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>;
}