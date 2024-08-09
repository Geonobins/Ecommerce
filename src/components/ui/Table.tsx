import React from "react";

type TableStructure = {
  name: string;
};

type TableComponentProps = {
  tableStructure: TableStructure[];
  tableData: Record<string, any>[]; // Assuming table data is an array of objects with string keys
};

const Table: React.FC<TableComponentProps> = ({
  tableStructure,
  tableData,
}) => {
  return (
    <div className="overflow-x-auto min-w-[100%] max-h-[100%]  rounded-2xl shadow-2xl"> 
        <table className="min-w-full bg-white border border-gray-300 ">
          <thead className="bg-gray-200 sticky top-0 rounded-3xl">
            <tr>
              {tableStructure.map((column) => (
                <th key={column.name} className="py-2 px-4 border-b text-left">
                  {column.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="max-h-[400px] overflow-y-auto bg-white">
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {tableStructure.map((column) => (
                  <td key={column.name} className="py-2 px-4 border-b">
                    {row[column.name]}
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
