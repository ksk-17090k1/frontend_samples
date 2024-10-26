"use client";

import { useState } from "react";
import boxStyle from "../../../styles/box.module.css";
import centerStyle from "../../../styles/center.module.css";
import stackStyle from "../../../styles/stack.module.css";
import coverStyle from "../../../styles/cover.module.css";
import style from "./page.module.css";

export const FileUpload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  // NOTE: React.DragEvent のデフォルトの挙動として、ドラッグされたファイルをブラウザで開く挙動があるため
  //       それを防ぐために preventDefault() を呼び出す

  // NOTE: 他には dragenter イベントもあるが、dragoverだけでいけそうなので使っていない。
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    // TODO: ファイルの拡張子のvalidationが必要
    const files = e.dataTransfer.files;
    if (files != null) {
      setFiles(files);
    } else {
      console.error("can't get file from drop");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) {
      console.error("can't get file");
      return;
    }
    setFiles(e.target.files);
  };

  return (
    <>
      <div
        className={`${boxStyle.box} ${style.droparea} ${isDragOver && style.dragover}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={coverStyle.cover}>
          <div
            className={`${coverStyle.coverTarget} ${centerStyle.center} ${stackStyle.stack}`}
          >
            <div className={`${centerStyle.center}`}>
              <p>ここにファイルをドロップしてください</p>
              <p>または</p>
            </div>
            {/* label要素の力でdiv要素をクリックしてもinputをクリックしたことになる！ */}
            <label>
              {/* 拡張子を制限したい場合はacceptを指定する */}
              <input
                type="file"
                name="uploadFile"
                className={`${style.displayNone}`}
                onChange={handleInputChange}
              />
              <div
                className={`${boxStyle.box} ${boxStyle.invert} ${style.fileUploadButton}`}
              >
                ファイルを選択する
              </div>
            </label>
            <div>{files && `ファイル名：${files[0].name}`}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
