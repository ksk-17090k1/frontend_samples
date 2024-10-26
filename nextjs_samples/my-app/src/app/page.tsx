import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href={"./tsukutte-manabu/accordion"}>Accordion</Link>
        <Link href={"./tsukutte-manabu/menu-bar"}>Menu-Bar</Link>
        <Link href={"./zustand"}>Zustand</Link>
        <Link href={"./samples"}>samples</Link>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
