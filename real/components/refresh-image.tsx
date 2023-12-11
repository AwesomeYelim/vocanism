'use client';

import Image from 'next/image';

interface Props {
  handler: () => void;
}

export const Refresh = ({ handler }: Props): JSX.Element => {
  //
  return (
    <Image
      src={`/img/refresh.svg`}
      alt="img"
      width={13}
      height={13}
      //   loading="eager"
      //   priority
      className="ml-1 inline-block cursor-pointer transition-all hover:-rotate-180"
      onClick={handler}
    />
  );
};
