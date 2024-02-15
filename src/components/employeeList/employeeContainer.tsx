import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading employees</div>;
  }

  if (employees === undefined) return <div>Error</div>;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;
  const totalRows = employees.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setCurrentPage(newPage));
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
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
              style={{
                height: 353,
              }}
            >
              <TableCell colSpan={3} />
            </TableRow>
          )}
        </TableBody>
        {totalPages > 1 && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={3}
                count={employees.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}
