import { DoubleArrowsSVG, DownArrow, UpArrow } from "../../utils/SVGs/SVGs";

const ReactTable = ({ tableInstance }) => {
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;
  return (
    <table {...getTableProps()} className="table mt-4 text-center react-table">
      <thead className="react-table_thead">
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} className={``} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => {
              return (
                <th
                  key={index}
                  className=""
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <span>
                    <span>{column.render("Header")} </span>
                    <span>
                      {column.Header === "Actions" ? (
                        ""
                      ) : column.isSorted ? (
                        column.isSortedDesc ? (
                          <span className="sorting_arrow-size">
                            <DownArrow />
                          </span>
                        ) : (
                          <span className="sorting_arrow-size">
                            <UpArrow />
                          </span>
                        )
                      ) : (
                        <span className="sorting_arrow-size">
                          <DoubleArrowsSVG />
                        </span>
                      )}
                    </span>
                  </span>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="react-table_tbody" {...getTableBodyProps()}>
        {page.map((row, index) => {
          prepareRow(row);
          return (
            <tr className={``} {...row.getRowProps()} key={index}>
              {row.cells.map((cell, idx) => {
                return (
                  <td key={idx} {...cell.getCellProps()} className="">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReactTable;
