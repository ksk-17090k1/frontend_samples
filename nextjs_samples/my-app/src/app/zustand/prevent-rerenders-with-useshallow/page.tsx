"use client";

import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

type State = {
  papaBear: string;
  mamaBear: string;
  littleBear: string;
  setPapaBear: (newVal: string) => void;
};

const useMeals = create<State>()((set) => ({
  papaBear: "large porridge-pot",
  mamaBear: "middle-size porridge pot",
  littleBear: "A little, small, wee pot",
  setPapaBear: (newVal) => set({ papaBear: newVal }),
}));

export const BearNames = () => {
  console.log("BearNames component rendered");
  // Next.jsだとそもそもuseShallowがないとエラーになるぽい
  // NOTE: 地味にstateにObject.keys()を使うのはzustandの仕様を理解してないとできないな、と思った。
  const names = useMeals(useShallow((state) => Object.keys(state)));
  // papaBearが更新されてもUIに影響を与えないので、再レンダリングされない！（useShallowの効果）
  const setPapaBear = useMeals((state) => state.setPapaBear);
  //   const papaBear = useMeals((state) => state.papaBear);

  return (
    <>
      <div>{names.join(", ")}</div>
      <button onClick={() => setPapaBear("pizza")}>set pizza</button>
      {/* <div>{papaBear}</div> */}
    </>
  );
};

export default BearNames;
