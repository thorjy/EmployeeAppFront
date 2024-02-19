import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Employee, getAllEmployees } from "../../features/employeeSlice";
import React, { useState } from "react";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeListQuery,
} from "../../services/employeeApi";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage, setCurrentPage } from "../../features/pageSlice";
import { useNavigate } from "react-router-dom";

interface employeeCardProps {
  employee: Employee;
}
export const DeleteButton: React.FC<employeeCardProps> = ({ employee }) => {
  const [open, setOpen] = React.useState(false);
  const [deleteEmployee, error] = useDeleteEmployeeMutation();
  const { data: employees, isError } = useGetEmployeeListQuery();
  const dispatch = useDispatch();
  const page = useSelector(selectCurrentPage);
  const [serverError, setServerError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setServerError(false);
  };

  const handleDelete = async () => {
    await deleteEmployee(employee.id);
    await employees;
    console.log(error);
    if (error.isUninitialized || error.isError) setServerError(true);
    if (employees) {
      if (employees.length % 10 === 1) {
        dispatch(setCurrentPage(page - 1));
      }
    }
  };

  return (
    <div>
      <IconButton
        aria-label="delete"
        sx={{ color: "red" }}
        onClick={handleClickOpen}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The employee will be permanently deleted!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
        {serverError && <Alert severity="error">An error has occured!</Alert>}
      </Dialog>
    </div>
  );
};
