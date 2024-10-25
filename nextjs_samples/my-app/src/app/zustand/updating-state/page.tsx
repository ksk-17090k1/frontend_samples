"use client";

import { create } from "zustand";
import { produce } from "immer";

type State = {
  deep: {
    nested: {
      obj: { count: number };
    };
  };
  normalInc: () => void;
  immerInc: () => void;
};

const useStore = create<State>()((set) => ({
  deep: {
    nested: {
      obj: { count: 0 },
    },
  },
  // 普通はこう書く
  normalInc: () =>
    set((state) => ({
      deep: {
        ...state.deep,
        nested: {
          ...state.deep.nested,
          obj: {
            ...state.deep.nested.obj,
            count: state.deep.nested.obj.count + 1,
          },
        },
      },
    })),
  // immerなら短く書ける
  immerInc: () =>
    set(
      produce((state: State) => {
        ++state.deep.nested.obj.count;
      })
    ),
}));
export const Counter = () => {
  const deep = useStore((state) => state.deep);
  const normalInc = useStore((state) => state.normalInc);
  return (
    <>
      <div>
        <button onClick={normalInc}>one up</button>
        <h1>{deep.nested.obj.count} around here...</h1>
      </div>
      <div>
        <button onClick={normalInc}>one up</button>
        <h1>{deep.nested.obj.count} around here...</h1>
      </div>
    </>
  );
};

export default Counter;
