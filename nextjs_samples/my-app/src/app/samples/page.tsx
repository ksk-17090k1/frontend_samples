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
      <div>
        <Link href="/samples/dnd-move">Drag and drop Move</Link>
      </div>
      <div>
        <Link href="/samples/url-search-params">URLSearchParams</Link>
      </div>
    </>
  );
};

export default Samples;
