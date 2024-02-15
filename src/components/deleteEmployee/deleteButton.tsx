import {
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
import React from "react";
import {
  useDeleteEmployeeMutation,
  useGetEmployeeListQuery,
} from "../../services/employeeApi";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../features/pageSlice";

interface employeeCardProps {
  employee: Employee;
}
export const DeleteButton: React.FC<employeeCardProps> = ({ employee }) => {
  const [open, setOpen] = React.useState(false);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const { data: employees, isLoading, isError } = useGetEmployeeListQuery();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      // Calling the deleteEmployee mutation with the employee id

      await deleteEmployee(employee.id);
      handleClose(); // Close the dialog after successful deletion
      if (employees?.length === 11) {
        dispatch(setCurrentPage(0));
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
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
      </Dialog>
    </div>
  );
};
