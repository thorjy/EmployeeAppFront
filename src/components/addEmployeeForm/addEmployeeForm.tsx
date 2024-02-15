import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import { useCreateNewEmployeeMutation } from "../../services/employeeApi";
import { RequiredField } from "./requiredField";
import "./employeeForm.css";
import { useNavigate } from "react-router-dom";

export const AddEmployeeForm = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [addEmployee] = useCreateNewEmployeeMutation();
  const nav = useNavigate();
  const [salaryError, setSalaryError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);

  const handleCreateButton = async () => {
    const newEmployee = {
      name: employeeName,
      salary: parseInt(employeeSalary),
      department: employeeDepartment,
    };

    if (employeeName.length < 3 || employeeName.length > 30) {
      setNameError(true);
      return;
    } else setNameError(false);

    if (newEmployee.salary < 0 || employeeSalary.length === 0) {
      setSalaryError(true);
      return;
    } else setSalaryError(false);

    if (employeeDepartment.length < 1) {
      setDepartmentError(true);
      return;
    } else setDepartmentError(false);

    await addEmployee(newEmployee);

    nav("/");
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "Employee Name":
        setEmployeeName(value);
        break;
      case "Employee Salary":
        setEmployeeSalary(value);
        break;
    }
  };

  const handleDepartmentChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmployeeDepartment(event.target.value);
  };

  return (
    <>
      <RequiredField
        requiredFields={["Employee Name"]}
        onChange={handleFieldChange}
        value={undefined}
        error={nameError}
      />
      <RequiredField
        requiredFields={["Employee Salary"]}
        onChange={handleFieldChange}
        value={undefined}
        error={salaryError}
      />
      <div className="textField">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Department</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={employeeDepartment}
            label="Department"
            onChange={handleDepartmentChange}
            error={departmentError}
          >
            <MenuItem value={"PS"}>PS</MenuItem>
            <MenuItem value={"HR"}>HR</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Button
        variant="contained"
        color="success"
        onClick={handleCreateButton}
        sx={{ margin: "2%" }}
      >
        Create
      </Button>
      <Snackbar
        open={salaryError}
        autoHideDuration={6000}
        message="Salary cannot be Negative or Empty!"
      />
      <Snackbar
        open={nameError}
        autoHideDuration={6000}
        message="Name must be minimum 4 letters and maximum 30 letters!"
      />
      <Snackbar
        open={departmentError}
        autoHideDuration={6000}
        message="Department cannot be empty!"
      />
    </>
  );
};
