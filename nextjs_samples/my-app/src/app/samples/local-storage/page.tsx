"use client";

import { useEffect, useState } from "react";

// custom hook
export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  // Next.jsでは絶対一度Server-side Renderingが走るのでuseEffectで囲む
  useEffect(() => {
    const res = window.localStorage.getItem(key);
    setValue(res == null ? undefined : res);
  }, [key]);

  const setItemToLocalStorage = (newValue: string) => {
    window.localStorage.setItem(key, newValue);
    setValue(newValue);
  };
  return { value, setItemToLocalStorage };
};

export const LocalStorage = () => {
  const { value, setItemToLocalStorage } = useLocalStorage("storage-key");

  return (
    <>
      <p>value: {value}</p>
      <button
        onClick={() => {
          setItemToLocalStorage(Math.random().toString());
        }}
      >
        setStorage
      </button>
    </>
  );
};

export default LocalStorage;
