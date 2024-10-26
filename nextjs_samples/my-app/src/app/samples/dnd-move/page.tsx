"use client";

import React, { useState } from "react";
import style from "./page.module.css";
import DraggableItem from "./components/DraggableItem";

const initialItems = [
  { id: "1", text: "Item 1" },
  { id: "2", text: "Item 2" },
  { id: "3", text: "Item 3" },
  { id: "4", text: "Item 4" },
];

export const DndMove = () => {
  const [items, setItems] = useState(initialItems);
  const [draggingItemId, setDraggingItemId] = useState<null | string>(null);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    id: string,
  ) => {
    setDraggingItemId(id);
    // コピーならcopy, 移動ならmoveを指定するのがUI的に良いとのこと。
    // refs: https://developer.mozilla.org/ja/docs/Web/API/DataTransfer/effectAllowed
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetId: string,
  ) => {
    event.preventDefault();
    const newItems = [...items];
    const draggingIndex = newItems.findIndex(
      (item) => item.id === draggingItemId,
    );
    const targetIndex = newItems.findIndex((item) => item.id === targetId);

    if (draggingIndex === -1 || targetIndex === -1) {
      console.error("can't find draggingIndex or targetIndex");
      return;
    }
    // spliceによる削除と挿入
    const [draggedItem] = newItems.splice(draggingIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    setItems(newItems);
    setDraggingItemId(null);
  };

  return (
    <>
      <h2 className={`${style.flexRow}`}>ドラッグアンドドロップ</h2>
      <div className={`${style.flexRow}`}>
        {items.map((item) => (
          <DraggableItem
            key={item.id}
            text={item.text}
            id={item.id}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
          />
        ))}
      </div>
    </>
  );
};

export default DndMove;
