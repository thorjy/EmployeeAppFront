import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import {
  useCreateNewEmployeeMutation,
  useGetEmployeeListQuery,
} from "../../services/employeeApi";
import { RequiredField } from "./requiredField";
import "./employeeForm.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPage, setCurrentPage } from "../../features/pageSlice";

export const AddEmployeeForm = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [employeeDepartment, setEmployeeDepartment] = useState("");
  const [addEmployee, error] = useCreateNewEmployeeMutation();
  const nav = useNavigate();
  const [salaryError, setSalaryError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [departmentError, setDepartmentError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const page = useSelector(selectCurrentPage);
  const { data: employees, isLoading, isError } = useGetEmployeeListQuery();
  const dispatch = useDispatch();

  const handleCreateButton = async () => {
    const newEmployee = {
      name: employeeName,
      salary: parseInt(employeeSalary),
      department: employeeDepartment,
    };
    if (validator()) {
      return;
    }

    await addEmployee(newEmployee);
    if (error.isError) {
      setServerError(true);
    } else {
      if (employees) {
        if (employees.length % 10 === 0 && employees.length !== 0) {
          dispatch(setCurrentPage(page + 1));
        }
      }
      nav("/");
    }
  };

  function validator() {
    var validateError = false;
    if (employeeName.length < 4 || employeeName.length > 30) {
      setNameError(true);
      validateError = true;
    } else setNameError(false);

    if (
      +employeeSalary < 0 ||
      employeeSalary.length === 0 ||
      !/^\d+$/.test(employeeSalary)
    ) {
      setSalaryError(true);
      validateError = true;
    } else setSalaryError(false);

    if (employeeDepartment.length < 1) {
      setDepartmentError(true);
      validateError = true;
    } else setDepartmentError(false);

    return validateError;
  }

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
        helpertext={"Name must be minimum 4 letters and maximum 30 letters!"}
      />
      <RequiredField
        requiredFields={["Employee Salary"]}
        onChange={handleFieldChange}
        value={undefined}
        error={salaryError}
        helpertext="Salary can only contain positive numbers!"
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
      {serverError && <Alert severity="error">An error has occured!</Alert>}
    </>
  );
};
