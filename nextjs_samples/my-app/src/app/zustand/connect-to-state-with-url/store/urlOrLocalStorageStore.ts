import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";

const getUrlSearch = () => {
  // slice(1) で?以降を取得
  return window.location.search.slice(1);
};

const persistentStorage: StateStorage = {
  getItem: (key): string => {
    // Check URL first
    if (getUrlSearch()) {
      const searchParams = new URLSearchParams(getUrlSearch());
      const storedValue = searchParams.get(key);
      return JSON.parse(storedValue as string);
    } else {
      // Otherwise, we should load from localstorage or alternative storage
      return JSON.parse(localStorage.getItem(key) as string);
    }
  },
  setItem: (key, newValue): void => {
    // Check if query params exist at all, can remove check if always want to set URL
    if (getUrlSearch()) {
      const searchParams = new URLSearchParams(getUrlSearch());
      searchParams.set(key, JSON.stringify(newValue));
      window.history.replaceState(null, "", `?${searchParams.toString()}`);
    }

    localStorage.setItem(key, JSON.stringify(newValue));
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(getUrlSearch());
    searchParams.delete(key);
    window.location.search = searchParams.toString();
  },
};

// URLパラメータやローカルストレージの場合は createJSONStorage の型引数にデータ型の指定が必要
export type LocalAndUrlStore = {
  typesOfFish: string[];
  addTypeOfFish: (fishType: string) => void;
  numberOfBears: number;
  setNumberOfBears: (newNumber: number) => void;
};

const storageOptions = {
  name: "fishAndBearsStore",
  // コールバック関数の返り値はStateStorage型
  // (optional) by default the 'localStorage' is used
  storage: createJSONStorage<LocalAndUrlStore>(() => persistentStorage),
};

// NOTE: 逆にcreateに型引数はいらないぽい。その理由は以下にも書いてある
// refs: https://zustand.docs.pmnd.rs/guides/typescript
const useLocalAndUrlStore = create(
  // persistで囲む & 型引数を指定
  persist<LocalAndUrlStore>(
    (set) => ({
      typesOfFish: [],
      addTypeOfFish: (fishType) =>
        set((state) => ({ typesOfFish: [...state.typesOfFish, fishType] })),

      numberOfBears: 0,
      setNumberOfBears: (numberOfBears) => set(() => ({ numberOfBears })),
    }),
    storageOptions,
  ),
);

export default useLocalAndUrlStore;
