(function () {
  const className = "reel";
  // reelクラスが付いている要素を全部取得する
  const reels = Array.from(document.querySelectorAll(`.${className}`));

  // overflowingクラスを動的に付け外しするコールバック関数
  const toggleOverflowClass = (elem) => {
    elem.classList.toggle("overflowing", elem.scrollWidth > elem.clientWidth);
  };

  // オーバーフローしたらコールバック関数が発火する
  for (let reel of reels) {
    if ("ResizeObserver" in window) {
      new ResizeObserver((entries) => {
        for (let entry of entries) {
          toggleOverflowClass(entry.target);
        }
      }).observe(reel);
    }
    // リールから子要素が動的に追加、削除された際に検知する
    if ("MutationObserver" in window) {
      new MutationObserver((mutations) => {
        for (let mutation of mutations) {
          toggleOverflowClass(mutation.target);
        }
      }).observe(reel, { childList: true });
    }
  }
})();
