import React from "react";

import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  ColumnResizeDirection,
} from "@tanstack/react-table";
import { TSTableReSizeDivRelative } from "./TSTableReSizeDivRelative";
import { TSTableReSizeTableElm } from "./TSTableReSizeTableElm";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const defaultColumns: ColumnDef<Person>[] = [
  {
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: "age",
        header: () => "Age",
        footer: (props) => props.column.id,
      },
      {
        header: "More Info",
        columns: [
          {
            accessorKey: "visits",
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "status",
            header: "Status",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "progress",
            header: "Profile Progress",
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];

export const TSTableReSize = () => {
  const [data] = React.useState(() => [...defaultData]);
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);

  const [columnResizeMode, setColumnResizeMode] =
    React.useState<ColumnResizeMode>("onChange");

  const [columnResizeDirection, setColumnResizeDirection] =
    React.useState<ColumnResizeDirection>("ltr");

  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    // デフォルトのカラムサイズはここで上書きできる
    // 下記はデフォルトの設定値
    defaultColumn: {
      size: 150, //starting column size
      minSize: 20, //enforced during column resizing
      maxSize: Number.MAX_SAFE_INTEGER, //enforced during column resizing
    },
    // ここの２つの設定がキモ！
    // ただし、大抵の場合で columnResizeDirection はデフォルトのltrでよいと思う
    columnResizeMode,
    columnResizeDirection,
    getCoreRowModel: getCoreRowModel(),
    // debug用の情報をコンソールに表示する (本番はfalseにすべき)
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  // NOTE: 本家のサンプルにはAbsoluteで位置を設定する版もあるが、あえてAbsolute使う理由がないので省略
  // なんなら以下にはtable要素使う版とdiv要素使う版の２つを表示しているが、基本前者を使うでよいと思う。
  // ただしtableのデフォルトのCSSをリセットしておく必要はあるが。
  return (
    <div className="p-2">
      <select
        value={columnResizeMode}
        onChange={(e) =>
          setColumnResizeMode(e.target.value as ColumnResizeMode)
        }
        className="border p-2 border-black rounded"
      >
        <option value="onEnd">Resize: "onEnd"</option>
        <option value="onChange">Resize: "onChange"</option>
      </select>
      <select
        value={columnResizeDirection}
        onChange={(e) =>
          setColumnResizeDirection(e.target.value as ColumnResizeDirection)
        }
        className="border p-2 border-black rounded"
      >
        <option value="ltr">Resize Direction: "ltr"</option>
        <option value="rtl">Resize Direction: "rtl"</option>
      </select>
      <div style={{ direction: table.options.columnResizeDirection }}>
        <div className="h-4" />
        <div className="text-xl">{"<table/>"}</div>
        <TSTableReSizeTableElm
          table={table}
          columnResizeMode={columnResizeMode}
        />
        <div className="h-4" />
        <div className="text-xl">{"<div/> (relative)"}</div>
        <TSTableReSizeDivRelative
          table={table}
          columnResizeMode={columnResizeMode}
        />
      </div>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
      <pre>
        {JSON.stringify(
          {
            columnSizing: table.getState().columnSizing,
            columnSizingInfo: table.getState().columnSizingInfo,
          },
          null,
          2,
        )}
      </pre>
    </div>
  );
};
