"use client";

import * as React from "react";
import useLocalAndUrlStore from "../store/urlOrLocalStorageStore";
import { LocalAndUrlStore } from "../store/urlOrLocalStorageStore";
import { useEffect, useState } from "react";

// URLパラメータの構造の定義
const buildURLSuffix = (params: LocalAndUrlStore, version = 0) => {
  const searchParams = new URLSearchParams();
  const zustandStoreParams = {
    state: {
      typesOfFish: params.typesOfFish,
      numberOfBears: params.numberOfBears,
    },
    version: version, // version is here because that is included with how Zustand sets the state
  };
  // The URL param key should match the name of the store, as specified as in storageOptions above
  searchParams.set("fishAndBearsStore", JSON.stringify(zustandStoreParams));
  return searchParams.toString();
};

// TODO: setterの挙動の確認はまだやっていない
export const UrlOrLocalStorage = () => {
  const numberOfBears = useLocalAndUrlStore((state) => state.numberOfBears);
  const params = useLocalAndUrlStore((state) => state);
  const [shareableUrl, setShareableUrl] = useState<string | null>(null);

  // Next.jsはSSRを前提としているため、windowへの参照は絶対にブラウザで実行されるuseEffectの中で行う
  useEffect(() => {
    const buildShareableUrl = (params: LocalAndUrlStore, version: number) => {
      return `${window.location.origin}?${buildURLSuffix(params, version)}`;
    };
    setShareableUrl(buildShareableUrl(params, 0));
  }, [params]);

  const encodedUrl = decodeURIComponent(shareableUrl || "");

  return (
    <>
      <div>{numberOfBears}</div>
      <div>URL: {encodedUrl}</div>
    </>
  );
};
