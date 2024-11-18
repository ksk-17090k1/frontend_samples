import style from "./TSTableReSize.module.css";

import {
  useReactTable,
  ColumnResizeMode,
  flexRender,
} from "@tanstack/react-table";

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

type Props = {
  table: ReturnType<typeof useReactTable<Person>>;
  columnResizeMode: ColumnResizeMode;
};

export const TSTableReSizeTableElm = ({ table, columnResizeMode }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table
        {...{
          style: {
            // ここポイント
            // table全体の幅をresizeの状況によって動的に取得する
            width: table.getCenterTotalSize(),
          },
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  {...{
                    key: header.id,
                    colSpan: header.colSpan,
                    style: {
                      // ここポイント
                      // cell 1つ分のwidthを動的に取得する
                      width: header.getSize(),
                    },
                    className: `${style.th}`,
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  <div
                    // もはやただのdivでなくて ColumnResizeIndicator とか名前つけたほうがいい気がする
                    {...{
                      // ダブルクリックされたらリセット
                      onDoubleClick: () => header.column.resetSize(),
                      // ここのイベントハンドラの指定が大事
                      //for desktop
                      onMouseDown: header.getResizeHandler(),
                      //for mobile
                      onTouchStart: header.getResizeHandler(),
                      className: `${style.resizer} ${
                        table.options.columnResizeDirection === "rtl"
                          ? style.rtl
                          : style.ltr
                      } ${
                        // resize中に色を変える
                        header.column.getIsResizing() ? style.isResizing : ""
                      }`,
                      style: {
                        // columnResizeMode はこことuseReactTableの引数の2箇所で使われている
                        // onEndかつリサイズ中だけtranslateXでリサイズのバーを動かせるようにする
                        transform:
                          columnResizeMode === "onEnd" &&
                          header.column.getIsResizing()
                            ? `translateX(${
                                (table.options.columnResizeDirection === "rtl"
                                  ? -1
                                  : 1) *
                                (table.getState().columnSizingInfo
                                  .deltaOffset ?? 0)
                              }px)`
                            : "",
                      },
                    }}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {/* 逆にtbodyはリサイズの設定はない。ないほうがいい。 */}
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  {...{
                    key: cell.id,
                    style: {
                      width: cell.column.getSize(),
                    },
                    className: `${style.td}`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
