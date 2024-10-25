"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

type BearState = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
};

const useStore = create<BearState>()(
  // react devtoolsを使うためにdevtools middlewareを使う (debug用)
  devtools((set) => ({
    bears: 0,
    // set((state) => (...state, { bears: state.bears + 1 })) と書いても良いが、zustandの仕様で set({ bears: newBears }) と書ける
    // setでオブジェクトを指定するのが読み解く際のポイントだと思った。
    updateBears: (newBears) => set({ bears: newBears }),
    removeAllBears: () => set({ bears: 0 }),
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  }))
);
export const Counter = () => {
  const bears = useStore((state) => state.bears);
  const increasePopulation = useStore((state) => state.increasePopulation);
  return (
    <div>
      <button onClick={increasePopulation}>one up</button>
      <h1>{bears} around here...</h1>
    </div>
  );
};

export default Counter;
