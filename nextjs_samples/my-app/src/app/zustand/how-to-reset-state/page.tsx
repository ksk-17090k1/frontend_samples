import { create } from "zustand";

// NOTE: 全般的にキレイな書き方なので、基本この書き方で良いかと思った。

// define types for state values and actions separately
type State = {
  salmon: number;
  tuna: number;
};

type Actions = {
  addSalmon: (qty: number) => void;
  addTuna: (qty: number) => void;
  reset: () => void;
};

// define the initial state
const initialState: State = {
  salmon: 0,
  tuna: 0,
};

// create store
// State & Actions としているのがミソ
export const useSlice = create<State & Actions>()((set, get) => ({
  // スプレッド構文でstateを一気に登録
  ...initialState,
  addSalmon: (qty: number) => {
    set({ salmon: get().salmon + qty });
  },
  addTuna: (qty: number) => {
    set({ tuna: get().tuna + qty });
  },
  reset: () => {
    set(initialState);
  },
}));
