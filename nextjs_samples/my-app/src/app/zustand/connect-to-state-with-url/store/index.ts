import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";
import { devtools } from "zustand/middleware";

// window.location.hash.slice(1) はURLハッシュの二文字目以降を取得する。１文字目は#。
const getUrlHash = () => {
  return window.location.hash.slice(1);
};

const hashStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(getUrlHash());
    const storedValue = searchParams.get(key) ?? "";
    return JSON.parse(storedValue);
  },
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(getUrlHash());
    searchParams.set(key, JSON.stringify(newValue));
    window.location.hash = searchParams.toString();
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(getUrlHash());
    searchParams.delete(key);
    window.location.hash = searchParams.toString();
  },
};

const storageOptions = {
  name: "count-hash-storage",
  // コールバック関数の返り値はStateStorage型
  // (optional) by default the 'localStorage' is used
  storage: createJSONStorage(() => hashStorage),
};

export const useStore = create<{
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}>()(
  devtools(
    // persistで囲む
    persist(
      (set) => ({
        count: 0,
        increase: () => set((state) => ({ count: state.count + 1 })),
        decrease: () => set((state) => ({ count: state.count - 1 })),
        reset: () => set({ count: 0 }),
      }),
      // ここがURLハッシュに保存する設定
      storageOptions
    )
  )
);
