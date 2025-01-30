import React from "react";

interface TableRow {
  label: string;
  value: string;
}

interface TableProps {
  leftTable: TableRow[];
  rightTable: TableRow[];
}

const ResponsiveTable = ({ leftTable, rightTable }: TableProps) => {
  return (
    <div
      className="w-full max-w-[596px] h-auto grid grid-cols-1 md:grid-cols-2 gap-4"
      style={{ minWidth: "300px" }} // 최소 너비 설정
    >
      {/* 왼쪽 테이블 */}
      <div className="flex flex-col border border-gray-100">
        {leftTable?.map((item, idx) => (
          <div
            key={idx}
            className="flex border-b border-gray-100:last-child:border-none"
          >
            <div className="w-1/2 bg-gray-50 border-r border-gray-100 px-4 py-3 text-gray-400 font-semibold">
              {item.label}
            </div>
            <div className="w-1/2 px-4 py-3">{item.value}</div>
          </div>
        ))}
      </div>

      {/* 오른쪽 테이블 */}
      <div className="flex flex-col border border-gray-100">
        {rightTable?.map((item, idx) => (
          <div
            key={idx}
            className="flex border-b border-gray-100:last-child:border-none"
          >
            <div className="w-1/2 bg-gray-50 border-r border-gray-100 px-4 py-3 text-gray-400 font-semibold">
              {item.label}
            </div>
            <div className="w-1/2 px-4 py-3">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveTable;
