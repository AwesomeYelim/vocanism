import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Home() {
  return redirect('/main');

  // return (
  //   <div className="w-80">
  //     <Link href="/main" className="link block text-gray-11">
  //       main
  //     </Link>
  //   </div>
  // );
}
