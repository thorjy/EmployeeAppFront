import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Alert,
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
  const {
    data: employeeData,
    isSuccess,
    error,
  } = useGetEmployeeByIdQuery(empID);
  const nav = useNavigate();
  const [salaryError, setSalaryError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [updateEmployee, haveError] = useUpdateEmployeeMutation();
  const [serverError, setServerError] = useState(false);
  const [changeError, setChangeError] = useState(false);
  const oldEmployee = employeeData;
  useEffect(() => {
    if (isSuccess && employeeData) {
      setEmployeeName(employeeData.name);
      setEmployeeSalary(employeeData.salary.toString());
      setEmployeeDepartment(employeeData.department);
    }
  }, [employeeData, isSuccess]);

  const handleUpdateButton = async () => {
    setSalaryError(false);
    const newEmployee = {
      name: employeeName,
      salary: +employeeSalary,
      department: employeeDepartment,
    };
    if (oldEmployee) {
      if (
        newEmployee.name === oldEmployee.name &&
        newEmployee.salary === oldEmployee.salary &&
        newEmployee.department === oldEmployee.department
      ) {
        setChangeError(true);
        return;
      } else setChangeError(false);
    }
    if (validator()) return;

    await updateEmployee([newEmployee, empID]);
    if (haveError.isError) {
      setServerError(true);
    } else nav("/");
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

  function validator() {
    var error = false;
    if (employeeName.length < 3 || employeeName.length > 30) {
      setNameError(true);
      error = true;
    } else setNameError(false);

    if (
      +employeeSalary < 0 ||
      +employeeSalary.length === 0 ||
      !/^\d+$/.test(employeeSalary)
    ) {
      setSalaryError(true);
      error = true;
    } else setSalaryError(false);

    if (employeeDepartment.length < 1) {
      setDepartmentError(true);
      error = true;
    } else setDepartmentError(false);
    return error;
  }

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
        helpertext={"Name must be minimum 4 letters and maximum 30 letters!"}
      />
      <RequiredField
        requiredFields={["Employee Salary"]}
        onChange={handleFieldChange}
        value={employeeSalary}
        error={salaryError}
        helpertext="Salary can only contain positive numbers"
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
        onClick={handleUpdateButton}
        sx={{ margin: "2%" }}
      >
        Update
      </Button>
      {serverError && <Alert severity="error">An error has occured!</Alert>}
      {changeError && (
        <Alert severity="error">Error! No changes made to employee!</Alert>
      )}
    </>
  );
};
