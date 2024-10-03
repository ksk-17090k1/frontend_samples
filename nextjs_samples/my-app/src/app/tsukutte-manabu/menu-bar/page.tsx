import Nav from "@/components/Nav";
import styles from "./page.module.css";
import Link from "next/link";

export const MenuBarPage = () => {
  return (
    <>
      <div>
        <div className={styles.area}>
          <Nav />
        </div>
        <hr />
        <Link href="/">Home</Link>
      </div>
    </>
  );
};

export default MenuBarPage;
