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

export const TSTableReSizeDivRelative = ({
  table,
  columnResizeMode,
}: Props) => {
  return (
    <div className="overflow-x-auto">
      <div
        {...{
          className: `${style.divTable}`,
          style: {
            width: table.getTotalSize(),
          },
        }}
      >
        <div className="thead">
          {table.getHeaderGroups().map((headerGroup) => (
            <div
              {...{
                key: headerGroup.id,
                className: style.tr,
              }}
            >
              {headerGroup.headers.map((header) => (
                <div
                  {...{
                    key: header.id,
                    className: style.th,
                    style: {
                      width: header.getSize(),
                    },
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  <div
                    {...{
                      onDoubleClick: () => header.column.resetSize(),
                      onMouseDown: header.getResizeHandler(),
                      onTouchStart: header.getResizeHandler(),
                      className: `${style.resizer} ${
                        table.options.columnResizeDirection === "rtl"
                          ? style.rtl
                          : style.ltr
                      } ${header.column.getIsResizing() ? style.isResizing : ""}`,
                      style: {
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
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          {...{
            className: "tbody",
          }}
        >
          {table.getRowModel().rows.map((row) => (
            <div
              {...{
                key: row.id,
                className: style.tr,
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  {...{
                    key: cell.id,
                    className: style.td,
                    style: {
                      width: cell.column.getSize(),
                    },
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
