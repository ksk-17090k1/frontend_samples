import React from "react";

// Tanstack TableのFilterのコードサンプルから拝借した。
// 典型的な debounce(一定時間内に複数回の入力があっても最後の入力のみを処理する) を実装するコンポーネントらしい

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = React.useState(initialValue);

  // 初期値が変わったらレンダリングしなおし
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // valueが変わったら一定時間後にイベントハンドラを実行する
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    // ここが一番のポイント！
    // 新しい入力が発生すると、前回のタイマーが clearTimeout によってクリアされるため、
    // 入力の頻度が多くても一定間隔でしか onChange が呼び出されない
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
