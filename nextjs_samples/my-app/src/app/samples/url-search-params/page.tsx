"use client";

export const urlSearchParams = () => {
  const sampleParamsObj = { name: "taro", age: "12" };
  const sampleParams = new URLSearchParams(sampleParamsObj);
  sampleParams.set("lang", "jp");
  sampleParams.set("country", "japan");
  const sampleUrl = `https://example.com?${sampleParams.toString()}`;

  // URLを文字列でURLSearchParamsにいれると上手くいかない
  const paramsString1 = "http://example.com/search?query=%40";
  const searchParams1 = new URLSearchParams(paramsString1);
  console.log(searchParams1.has("query")); // false
  console.log(searchParams1.has("http://example.com/search?query")); // true

  // URL全体を一度URLオブジェクトにして、url.searchをURLSearchParamsにいれる形が良い。
  const url = new URL("http://example.com/search?query=%40");
  console.log(url.search); // ?query=%40
  const searchParams3 = new URLSearchParams(url.search);
  console.log(searchParams3.has("query")); // true

  return (
    <>
      <div>
        <h2>URL: {sampleUrl}</h2>
      </div>
    </>
  );
};

export default urlSearchParams;
