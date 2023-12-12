'use client';

import { ReactNode } from 'react';
import { atom, RecoilRoot } from 'recoil';

type Props = {
  children: ReactNode;
};

export const rootAtom = atom({
  key: 'etymology',
  default: [],
});
export const idiomAtom = atom<[string, string[]]>({
  key: 'idiom',
  default: ['', ['']],
});
export const targetWordsAtom = atom({
  key: 'targetWords',
  default: [],
});

export default function Recoil({ children }: Props) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
