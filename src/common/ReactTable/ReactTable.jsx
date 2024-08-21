import React, { useMemo } from "react";
import {
  useRowSelect,
  useTable,
  useGlobalFilter,
  usePagination,
} from "react-table";
import {
  Checkbox,
  TableSearchBox,
  SelectBox,
  TablePagination,
} from "@commonPartials";

function ReactTable({ data }) {
  const columns = useMemo(() => {
    if (data.length === 0) return [];

    const keys = Object.keys(data[0]);
    return keys.map((key) => ({
      Header: key,
      accessor: key,
    }));
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    setPageSize,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <Checkbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
    useGlobalFilter,
    usePagination,
    useRowSelect
  );
  const { globalFilter, pageIndex, pageSize } = state;
  {
    /* {console.log("STATE : ", state)} */
  }
  {
    /* {console.log(selectedFlatRows.map((row) => row.original.id))} */
  }
  return (
    <>
      <div className="border dark:border-neutral-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          {/* SEARCH BOX */}
          <div className="mb-2 flex w-[300px] p-3">
            <TableSearchBox
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
          </div>
          <div className="mb-2 flex w-[300px] p-3">
            <SelectBox
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          </div>
        </div>

        {/* TABLE */}
        <table
          className="w-full overflow-x-scroll text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right"
          {...getTableProps()}
        >
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeaderGroupProps } =
                headerGroup.getHeaderGroupProps();
              // console.log("Header ROW: ", key);

              return (
                <tr
                  key={key}
                  {...restHeaderGroupProps}
                >
                  {headerGroup.headers.map((column) => {
                    const { key, ...restColumnProps } = column.getHeaderProps();
                    // console.log(
                    //   "ColumnGetHeaderProps : ",
                    //   column.getHeaderProps()
                    // );
                    // console.log("HEADER COLUMN =>", column.id);

                    return (
                      <th
                        key={column.id}
                        scope="col"
                        className="px-6 py-3"
                        {...restColumnProps}
                      >
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              // console.log("RowGetHeaderProps : ", row.getRowProps());
              // console.log("BODY ROW KEY : ", row.original.id);
              // console.log("Row : ", row);

              return (
                <tr
                  key={row.original.id}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  {...restRowProps}
                >
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    // console.log("CellGetHeaderProps : ", cell.getCellProps());
                    // console.log("Cells Key : ", key);
                    // console.log("BODY ROW CELL : ", cell.column.id);

                    return (
                      <td
                        key={cell.column.id}
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                        {...restCellProps}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* TABLE PAGINATION */}
        <TablePagination
          currentPage={pageIndex}
          totalPages={pageCount}
          gotoPage={gotoPage}
          pageOptions={pageOptions}
          next={nextPage}
          canNext={canNextPage}
          previous={previousPage}
          canPrev={canPreviousPage}
        />
      </div>
    </>
  );
}

export default ReactTable;
