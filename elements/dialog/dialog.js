const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const selectEl = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");

// NOTE: このJavaScriptはよくわかんないので、メモの方を参照してイチから実装したほうが早い気がする。

// "Show the dialog" ボタンで <dialog> をモーダルに開く
// 逆に、<dialog>はopen属性での切り替えは推奨されていない！！！！！
// なので自作コンポーネントではopenを使うが、内部のdialog要素はshowModal()を使うように実装する必要がある
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// "Favorite animal" 入力で、送信ボタンの値を設定する
selectEl.addEventListener("change", (e) => {
  confirmBtn.value = selectEl.value;
});

// "Cancel" ボタンで [formmethod="dialog"] による送信を行わずにダイアログを閉じ、close イベントを発行する
favDialog.addEventListener("close", (e) => {
  outputBox.value =
    favDialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${favDialog.returnValue}.`; // 空文字列ではなく、既定値かどうかを調べる必要がある
});

// ［確認］ボタンが既定でフォームを送信しないようにし、`close()` メソッドでダイアログを閉じ、"close" イベントを発生させる
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // この偽フォームを送信しない
  favDialog.close(selectEl.value); // ここで選択ボックスの値を送る必要がある
});

// ダイアログの背景をクリックするとダイアログを閉じる
favDialog.addEventListener("click", (e) => {
  // dialog 背景含めて全体がフック対象
  const { target, currentTarget } = e;
  if (target === currentTarget) {
    // 両方 dialog 自身なのは backdrop のみになる
    favDialog.close();
  }
});
