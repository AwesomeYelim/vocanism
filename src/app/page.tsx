import Image from "next/image";
import { Block } from "./components/Block";
import { Search } from "./components/Search";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Search />
      <Block />
    </main>
  );
}
