import Link from "next/link";

export const Samples = () => {
  return (
    <>
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/samples/local-storage">Local Storage</Link>
      </div>
      <div>
        <Link href="/samples/file-upload">File Upload</Link>
      </div>
    </>
  );
};

export default Samples;
