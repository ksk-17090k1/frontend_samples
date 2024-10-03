"use client";

import Link from "next/link";
import styles from "@/styles/nav.module.css";
import { useState } from "react";

const Nav = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const toggleNav = () => {
    setNavIsOpen(!navIsOpen);
  };
  const closeNav = () => {
    setNavIsOpen(false);
  };
  return (
    <nav className={navIsOpen ? styles.open : styles.close}>
      {navIsOpen && (
        <style jsx global>{`
          @media (max-width: 767px) {
            body {
              overflow: hidden;
              position: fixed;
              width: 100%;
            }
          }
        `}</style>
      )}
      <button className={styles.btn} onClick={toggleNav}>
        <span className={styles.bar}></span>
        <span className="sr-only">MENU</span>
      </button>
      <ul className={styles.list}>
        <li>
          <Link href="/">
            <div onClick={closeNav}>Home</div>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <div onClick={closeNav}>About</div>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <div onClick={closeNav}>Blog</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
