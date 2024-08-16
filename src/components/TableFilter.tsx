import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type TableFilterProps = {
  handleCloseFilter: () => void;
  isOpen: boolean;
  visibleColumns: string[];
  setVisibleColumns: (columns: string[]) => void;
};

export const TableFilter = ({ isOpen, handleCloseFilter, visibleColumns, setVisibleColumns }: TableFilterProps) => {

  const handleCheckboxChange = (columnName: string) => {
    if (visibleColumns.includes(columnName)) {
      setVisibleColumns(visibleColumns.filter(col => col !== columnName));
    } else {
      setVisibleColumns([...visibleColumns, columnName]);
    }
  };

  const tableStructure = ["id", "name", "category", "price", "availability"]; // Example column names

  return (
    <Dialog open={isOpen} onClose={handleCloseFilter} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed top-[10%] max-h-[43%] inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-sm transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl rounded-lg">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Filter Columns</DialogTitle>
                    
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={handleCloseFilter}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <hr className="mt-8"/>

                  <div className="mt-8">
                    <div className="flow-root">
                      {tableStructure.map((columnName) => (
                        <div key={columnName} className="flex items-center my-4">
                          <input
                            type="checkbox"
                            id={columnName}
                            defaultChecked={visibleColumns.includes(columnName)}
                            onChange={() => handleCheckboxChange(columnName)}
                            className="mr-2"
                          />
                          <label htmlFor={columnName} className="text-gray-700">
                            {columnName}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
