"use client";

import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";

type FishState = {
  fishes: number;
  addFish: () => void;
};
type BearState = {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
};
type BearFishState = {
  addBearAndFish: () => void;
};

// sliceの定義
// TypeScript対応するにはStateCreatorで関数の型を作るのがポイント
export const createFishSlice: StateCreator<
  FishState & BearState,
  [],
  [],
  FishState
> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});
export const createBearSlice: StateCreator<
  FishState & BearState,
  [],
  [],
  BearState
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
});

// sliceから新しいsliceを作る
export const createBearFishSlice: StateCreator<
  FishState & BearState,
  [],
  [],
  BearFishState
> = (set, get) => ({
  addBearAndFish: () => {
    get().addBear();
    get().addFish();
  },
});

// sliceを結合してstoreを作る
// ...aはrest parameter. pythonの*args的なもの
export const useBoundStore = create<FishState & BearState & BearFishState>()(
  (...a) => ({
    ...createBearSlice(...a),
    ...createFishSlice(...a),
    ...createBearFishSlice(...a),
  })
);

// persistを使いたい場合は普通にpersistで囲めばOK
export const useBoundStorePersist = create<FishState & BearState>()(
  persist(
    (...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
    }),
    { name: "bound-store" }
  )
);

function App() {
  const bears = useBoundStore((state) => state.bears);
  const fishes = useBoundStore((state) => state.fishes);
  const addBear = useBoundStore((state) => state.addBear);
  const addFish = useBoundStore((state) => state.addFish);
  const addBearAndFish = useBoundStore((state) => state.addBearAndFish);
  return (
    <div>
      <h2>Number of bears: {bears}</h2>
      <h2>Number of fishes: {fishes}</h2>
      <button onClick={() => addBear()}>Add a bear</button>
      <button onClick={() => addFish()}>Add a fish</button>
      <button onClick={() => addBearAndFish()}>Add a fish and a bear</button>
    </div>
  );
}

export default App;
