"use client";

import { create } from "zustand";

type State = {
  count: number;
  text: string;
};

export const useStore = create<State>()(() => ({
  count: 0,
  text: "hello",
}));

// setterを別で切り出すこともできる
// zustandとしてはstateとsetterを同時に定義するのがオススメだが、別で定義するやり方もとくに欠点はないらしい
export const inc = () =>
  useStore.setState((state) => ({ count: state.count + 1 }));
export const setText = (text: string) => useStore.setState({ text });

// NOTE: JavaScript組み込みのMapやSetオブジェクトをstateにしたい場合はsetterは上記の別で切り出す方法で定義する必要がある
// refs: https://zustand.docs.pmnd.rs/guides/maps-and-sets-usage

// NOTE: こんな感じで関数にせずに直接setすることもできる
useStore.setState((state) => ({ count: state.count + 1 }));
