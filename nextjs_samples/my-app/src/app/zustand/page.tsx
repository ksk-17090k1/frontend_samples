import Link from "next/link";

export const MenuBarPage = () => {
  return (
    <>
      <div>
        <Link href="/zustand/getstarted">Get Started!</Link>
      </div>
      <div>
        <Link href="/zustand/updating-state">Updating State</Link>
      </div>
      <div>
        <Link href="/zustand/connect-to-state-with-url">
          Connect to state with URL
        </Link>
      </div>
      <div>
        <Link href="/zustand/how-to-reset-state">How to reset state</Link>
      </div>
      <div>
        <Link href="/zustand/slice-pattern">Slice Pattern</Link>
      </div>
      <div>
        <Link href="/zustand/prevent-rerenders-with-useshallow">
          Prevent rerenders with useShallow
        </Link>
      </div>
      <div>
        <Link href="/">Home</Link>
      </div>
    </>
  );
};

export default MenuBarPage;
