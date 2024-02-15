import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import {
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
} from "../../services/employeeApi";
import { RequiredField } from "../addEmployeeForm/requiredField";
import { useLocation, useNavigate } from "react-router-dom";
import "../addEmployeeForm/employeeForm.css";
import React from "react";

// ALL THE IMPORTS

export const EditEmployeeForm = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const empID = params.get("id") || "";
  const { data: employeeData, isSuccess } = useGetEmployeeByIdQuery(empID);
  const nav = useNavigate();
  const [salaryError, setSalaryError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);

  const [employeeName, setEmployeeName] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [updateEmployee] = useUpdateEmployeeMutation();

  useEffect(() => {
    if (isSuccess && employeeData) {
      setEmployeeName(employeeData.name);
      setEmployeeSalary(employeeData.salary.toString());
      setEmployeeDepartment(employeeData.department);
    }
  }, [employeeData, isSuccess]);

  const handleUpdateButton = async () => {
    if (employeeName.length < 3 || employeeName.length > 30) {
      setNameError(true);
      return;
    } else setNameError(false);

    if (parseInt(employeeSalary) < 0 || employeeSalary.length === 0) {
      setSalaryError(true);
      return;
    } else setSalaryError(false);

    if (employeeDepartment.length < 1) {
      setDepartmentError(true);
      return;
    } else setDepartmentError(false);

    const newEmployee = {
      name: employeeName,
      salary: parseInt(employeeSalary),
      department: employeeDepartment,
    };
    await updateEmployee([newEmployee, empID]);
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
        value={employeeName}
        error={nameError}
      />
      <RequiredField
        requiredFields={["Employee Salary"]}
        onChange={handleFieldChange}
        value={employeeSalary}
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
          >
            <MenuItem value={"PS"}>PS</MenuItem>
            <MenuItem value={"HR"}>HR</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button
        variant="contained"
        color="success"
        onClick={handleUpdateButton}
        sx={{ margin: "2%" }}
      >
        Update
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
