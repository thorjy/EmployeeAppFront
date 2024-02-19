import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useGetEmployeeListQuery } from "../../services/employeeApi";
import { EmployeeCard } from "./employeeCard";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage, setCurrentPage } from "../../features/pageSlice";
import { TablePaginationActions } from "../pagination/pagination";
import "./employeeCard.css";

export function EmployeeContainer() {
  const dispatch = useDispatch();
  const page = useSelector(selectCurrentPage);
  const rowsPerPage = 10;

  const { data: employees, isLoading, isError } = useGetEmployeeListQuery();
  const count = employees?.length;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (employees === undefined) return <div>Error</div>;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <TableContainer>
      <div style={{ minWidth: 500 }}>
        <div>
          <div className="container">
            {(rowsPerPage > 0
              ? employees.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : employees
            ).map((employee) => (
              <EmployeeCard
                key={employee.id}
                name={employee.name}
                department={employee.department}
                salary={employee.salary}
                id={employee.id}
              />
            ))}
          </div>
          {emptyRows > 0 && (
            <TableRow
            // style={{
            //   height: 353,
            // }}
            >
              <TableCell colSpan={3} />
            </TableRow>
          )}
        </div>
        <div
          className="footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "3%",
          }}
        >
          <div style={{ display: "flex", color: "rgb(3, 46, 82)" }}>
            <span className="entries">
              Showing{" "}
              <strong>
                {page * 10 + 1}-{Math.min(employees.length, (page + 1) * 10)}{" "}
              </strong>
              out of <strong>{employees.length} </strong>
              entries
            </span>
          </div>
          <div
            className="pageButtons"
            style={{ display: "flex", width: "20%" }}
          >
            <TablePaginationActions
              onPageChange={handleChangePage}
              count={employees.length}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </div>
        </div>
      </div>
    </TableContainer>
  );
}
