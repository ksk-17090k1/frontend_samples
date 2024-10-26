"use client";

import { useEffect, useState } from "react";

// custom hook
export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<string>("initial value");

  useEffect(() => {
    const res = window.localStorage.getItem(key);
    setValue(res == null ? "local storage is empty" : res);
  }, [key]);

  const setValueAndStorage = (newValue: string) => {
    window.localStorage.setItem(key, newValue);
    setValue(newValue);
  };
  return { value, setValueAndStorage };
};

export const LocalStorage = () => {
  const { value, setValueAndStorage } = useLocalStorage("storage-key");

  return (
    <>
      <p>value: {value}</p>
      <button
        onClick={() => {
          setValueAndStorage(Math.random().toString());
        }}
      >
        setStorage
      </button>
    </>
  );
};

export default LocalStorage;
