import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import "./CustomTable.css";

export const CustomTable = ({ data, viewProfile, headers }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <div className="user-basic-info">
                  <i
                    className="fa fa-2x fa-user user-icon"
                    aria-hidden="true"
                  ></i>
                  <p
                    className="user-info-link"
                    onClick={viewProfile.bind(this, index)}
                  >
                    {row.name}
                  </p>{" "}
                  ({row.source})
                </div>
              </TableCell>
              {headers.map((header, index) => {
                let displayData;
                if (header === "Head") {
                  displayData = row["designation"];
                } else if (header === "Profile") {
                  displayData = row["links"].join(", ");
                } else if (header === "Query") {
                  displayData = row["entries"];
                } else {
                  displayData = row[header.toLowerCase()];
                }
                if (header !== "Name") {
                  return <TableCell key={index}>{displayData}</TableCell>;
                } else {
                  return null;
                }
              })}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="custom-table-centered">
            <TablePagination
            className="custom-table-pagination"
              rowsPerPageOptions={[5, 10, 20, { label: "All", value: -1 }]}
              colSpan={1}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
