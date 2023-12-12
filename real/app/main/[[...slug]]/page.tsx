import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Detail } from '~/components/detail';
import { RootList } from '~/components/rootList';
import { geteEtymology } from '~/service/words';
// import './page.scss';

interface Props {
  params: {
    slug: string;
  };
}

export type T_Word = {
  rank: number;
  root: string;
  meaning: string[];
  origin: string[];
  from: string;
  ex: { [key: string]: string };
};

export default async function WordsPage({ params: { slug } }: Props) {
  const res = await geteEtymology(slug);
  if (!slug) {
    redirect('main/A');
  }

  if (typeof slug === 'object' && (slug as string[]).length > 1) {
    return (
      <div
        className="flex flex-wrap items-center gap-2"
        data-animate
        data-animate-stage={1}
      >
        <Detail {...res} />
      </div>
    );
  }
  const props = { res, slug };

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      data-animate
      data-animate-stage={1}
    >
      <RootList {...props} />
    </div>
  );
}
