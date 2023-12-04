import { WordRoot } from '~/components/word-root';
import { getPost, getWords } from '~/service/words';
import './page.scss';

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

export default async function page({ params }: Props) {
  let { slug } = params;
  let res = getPost(slug || 'A');

  if (typeof slug === 'object' && (slug as string[]).length > 1) {
    slug = (slug as string[]).join('/');
    res = getWords(slug);
  }

  return (
    <div className="root_wrapper" data-animate data-animate-stage={1}>
      {(await res).map((el: T_Word, i: number) => {
        return <WordRoot {...el} />;
      })}
    </div>
  );
}
