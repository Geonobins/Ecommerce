import React, { useEffect, useState } from "react";

type TableStructure = {
  name: string;
};

type SortOrder = "asc" | "desc" | null;

type TableComponentProps = {
  tableStructure: TableStructure[];
  tableData: Record<string, any>[];
  handleRowClick?: (rowIndex: number) => void;
  isHover?: boolean;
  isTableHover?: boolean;
  emphasis?: string;
  maxvalue?: number;
  renderCustomContent?: (columnName: string, row: Record<string, any>) => React.ReactNode;
};

const Table: React.FC<TableComponentProps> = ({
  tableStructure,
  tableData,
  handleRowClick,
  isHover,
  isTableHover,
  emphasis,
  maxvalue,
  renderCustomContent,
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [sortedTableData, setTableData] = useState(tableData);

  useEffect(() => {
    setTableData(tableData);
  }, [tableData]);

  const handleSort = (columnName: string) => {
    const isAsc = sortColumn === columnName && sortOrder === "asc";
    const newSortOrder: SortOrder = isAsc ? "desc" : "asc";
    setSortColumn(columnName);
    setSortOrder(newSortOrder);

    const sortedData = [...tableData].sort((a, b) => {
      if (a[columnName] < b[columnName]) return newSortOrder === "asc" ? -1 : 1;
      if (a[columnName] > b[columnName]) return newSortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setTableData(sortedData);
  };

  return (
    <div className="overflow-x-auto text-xl min-w-[100%] max-h-[100%] rounded-2xl shadow-2xl">
      <table
        className={`${
          isTableHover && "hover:text-slate-600 hover:cursor-pointer"
        } min-w-full bg-white border border-gray-300 border-separate`}
      >
        <thead className="bg-gray-200 sticky top-0 rounded-3xl">
          <tr>
            {tableStructure.map((column) => (
              <th
                key={column.name}
                className="py-2 px-4 border-b text-left capitalize cursor-pointer"
                onClick={() => handleSort(column.name)}
              >
                {column.name}
                {sortColumn === column.name && (
                  <span className="ml-2">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-h-[400px] overflow-y-auto bg-white">
          {sortedTableData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                isHover && "hover:bg-slate-100 cursor-pointer"
              }  `}
            >
              {tableStructure.map((column) => (
                <td
                  key={column.name}
                  className={`py-2 px-4 border-b ${
                    maxvalue &&
                    column.name === emphasis &&
                    row[column.name] < maxvalue &&
                    "text-red-500"
                  }`}
                  onClick={() =>
                    handleRowClick && handleRowClick(row.id)
                  }
                >
                  {renderCustomContent && renderCustomContent(column.name, row)
                    ? renderCustomContent(column.name, row)
                    : row[column.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
