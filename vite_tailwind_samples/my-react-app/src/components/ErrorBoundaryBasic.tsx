// refs: https://zenn.dev/longbridge/articles/b7e76b31f993d9

import { useState } from "react";
import {
  FallbackProps,
  ErrorBoundary,
  // 最新ver(4.1.2)だと useErrorHandler が無い。v3.1.4なら動く
  // TODO: 最新verでも動くようにする
  useErrorHandler,
} from "react-error-boundary";

// NOTE: ErrorBoundaryで囲っても検証ツールのコンソールにはエラーは表示される

export const ErrorBoundaryBasic = () => {
  return (
    <>
      {/* ここの ErrorBoundary は Page5のエラーをcatchする。リレンダリングで直るエラーなのでonResetの指定は不要！ */}
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
        <Page1 />
        {/* 以下は Page2でエラー発生するので、 background-color が表示されない */}
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
          <Page2 />
        </ErrorBoundary>
        {/* 以下はPage3Childでエラー発生するので、background-colorが表示される */}
        <Page3 />
        <Page4 />
        <Page5 />
      </ErrorBoundary>
    </>
  );
};
function Page1() {
  console.log("Page1 render");
  return (
    <div style={{ backgroundColor: "#31C2CF" }}>
      <h3>Page1</h3>
    </div>
  );
}

function Page2() {
  console.log("Page2 render");
  return (
    <div style={{ backgroundColor: "#D9A0A4" }}>
      <h3>Page2</h3>
      <ThrowError />
    </div>
  );
}

function Page3() {
  console.log("Page3 render");
  return (
    <div style={{ backgroundColor: "#DFD35F" }}>
      <h3>Page3</h3>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Page3Child />
      </ErrorBoundary>
    </div>
  );
}

function Page3Child() {
  console.log("Page3Child render");
  const title = "Page3Child";

  return (
    <div style={{ backgroundColor: "#DEB331" }}>
      <h5>{title}</h5>
      <ThrowError />
    </div>
  );
}

function Page4() {
  console.log("Page4 render");
  return (
    <div style={{ backgroundColor: "#078080" }}>
      <h3>Page4</h3>
      <Page4Child />
    </div>
  );
}

function Page4Child() {
  console.log("Page4Child render");
  const [throwError, setThrowError] = useState(false);
  const onClick = () => {
    setThrowError((preThrowError) => !preThrowError);
  };
  const onReset = () => {
    setThrowError((pre) => !pre);
  };
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={onError}
      onReset={onReset}
      // TODO: なんかここなくてもエラー直せる、、、なぜ、、、
      resetKeys={[throwError]}
    >
      <div>
        <button
          type="button"
          onClick={onClick}
          style={{ border: "1px solid #000", padding: "4px" }}
        >
          エラーを発生させるボタン
        </button>
        {throwError && <ThrowError />}
      </div>
    </ErrorBoundary>
  );
}

// NOTE: 同様のやり方で非同期処理のエラーもキャッチできる
function Page5() {
  const handleError = useErrorHandler();
  const onClick = () => {
    try {
      throw Error("Page5 throw error");
    } catch (error: unknown) {
      // ここでエラーをキャッチして ErrorBoundary に渡す！！！
      handleError(error);
    }
  };
  return (
    <div style={{ backgroundColor: "#FF7272" }}>
      <h3>Page5</h3>
      <button
        type="button"
        onClick={onClick}
        style={{ border: "1px solid #000", padding: "4px" }}
      >
        エラーを発生させるボタン
      </button>
    </div>
  );
}

// resetErrorBoundary はエラーを解消するための関数
// ErrorBoundary要素のonResetに渡す。
// ただし、時間経過でエラーが直る場合はonResetには何も渡さずでOK
function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div>
      <h2>エラーが発生しました。ErrorFallbackを表示します。</h2>
      <pre>{error.message}</pre>
      <button
        type="button"
        onClick={resetErrorBoundary}
        style={{ border: "1px solid #000", padding: "4px" }}
      >
        エラーを解決する
      </button>
    </div>
  );
}

function ThrowError(): JSX.Element {
  throw new Error("Throw Error!!");
}

// エラーが発生したときに呼ばれる関数
const onError = (error: Error, info: { componentStack: string }) => {
  console.log("error.message", error.message);
  console.log("info.componentStack:", info.componentStack);
};
