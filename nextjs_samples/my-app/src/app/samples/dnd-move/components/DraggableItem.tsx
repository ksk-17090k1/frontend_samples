import React, { useState } from "react";
import style from "./DraggableItem.module.css";

type Props = {
  text: string;
  id: string;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>, id: string) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>, id: string) => void;
};

export const DraggableItem = ({
  text,
  id,
  handleDragStart,
  handleDrop,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = () => {
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <div
        // これ地味に忘れないように注意
        draggable
        className={`${style.box} ${isDragging && style.dragging}`}
        onDragStart={(event) => handleDragStart(event, id)}
        onDrop={(event) => {
          setIsDragging(false);
          handleDrop(event, id);
        }}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <div className={`${style.cover} ${style.center}`}>{text}</div>
      </div>
    </>
  );
};

export default DraggableItem;
