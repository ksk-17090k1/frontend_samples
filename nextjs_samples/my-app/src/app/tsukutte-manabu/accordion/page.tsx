import { Accordion } from "@/components/Accordion";
import styles from "./page.module.css";
import Link from "next/link";

export const AccordionPage = () => {
  return (
    <>
      <div>
        <div className={styles.area}>
          <Accordion heading="Accordion Heading">Accordion Content</Accordion>
        </div>
        <hr />
        <Link href="/">Home</Link>
      </div>
    </>
  );
};

export default AccordionPage;
