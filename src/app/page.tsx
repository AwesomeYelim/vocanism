import Image from "next/image";
import { Search } from "./components/Search";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Search />
    </main>
  );
}
