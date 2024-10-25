"use client";

import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../store";

export const Controls = () => {
  const [increase, decrease, reset] = useStore(
    // TODO: useShallowつけないとエラーだが、なぜかはわからない
    useShallow((state) => [state.increase, state.decrease, state.reset])
  );

  return (
    <div>
      <button onClick={increase}>+</button>
      <button onClick={decrease} style={{ marginLeft: 12 }}>
        -
      </button>
      <button onClick={reset} style={{ marginLeft: 12 }}>
        重置
      </button>
    </div>
  );
};
