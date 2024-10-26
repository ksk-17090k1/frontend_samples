// Reactで書き直しもしている。が素のJavaScriptのスニペットになると思って残している

const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("uploadFile");

// ドラッグオーバー時の処理
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragover");
});
// ドラッグアウト時の処理
dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragover");
});
// ドロップ時の処理
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragover");

  // ドロップしたファイルの取得
  const files = e.dataTransfer.files;
  if (typeof files[0] !== "undefined") {
    // 取得したファイルをinput要素へ
    console.log("get file from drop");
    fileInput.files = files;
    // TODO: ファイルが正常に受け取れた際の残りの処理
  } else {
    console.log("can't get file from drop");
    // TODO: ファイルが受け取れなかった際の処理
  }
});

// ファイルがアップロードされた際の処理
fileInput.addEventListener(
  "change",
  (e) => {
    var file = e.target.files[0];

    if (typeof e.target.files[0] !== "undefined") {
      console.log("get file");
      // TODO: ファイルが正常に受け取れた際の処理
    } else {
      console.log("can't get file");
      // TODO: ファイルが受け取れなかった際の処理
    }
  },
  false,
);
