// Reactで書き直しもしている

// drag対象に対して dragstart イベントをlistenする
document.querySelector(".box.drag").draggable = true;
document.querySelector(".box.drag").addEventListener("dragstart", onDragStart);

// dropされる側に対して4つのイベントをlistenする
document.querySelectorAll(".box.drop").forEach((element) => {
  element.addEventListener("drop", onDrop);
  element.addEventListener("dragover", onDragover);
  element.addEventListener("dragenter", onDragenter);
  element.addEventListener("dragleave", onDragleave);
});

const onDragStart = (event) => {
  event.dataTransfer.setData("text", event.currentTarget.id);
};

const onDrop = (event) => {
  event.currentTarget.classList.remove("dragging");
  const boxs = [...document.querySelectorAll(".box")];
  // NOTE: 正直ここの実装はかなり微妙なので改善したほうがいい。Reactならもっとよいロジックを簡単に書ける
  // 一番左の要素なら左に、それ以外なら右に挿入する
  if (boxs.indexOf(event.currentTarget) === 0) {
    event.currentTarget.before(
      document.getElementById(event.dataTransfer.getData("text")),
    );
  } else {
    event.currentTarget.after(
      document.getElementById(event.dataTransfer.getData("text")),
    );
  }
};

const onDragenter = (event) => {
  event.currentTarget.classList.toggle("dragging");
};

const onDragleave = (event) => {
  event.currentTarget.classList.toggle("dragging");
};

const onDragover = (event) => {
  event.preventDefault();
};
