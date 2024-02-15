import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddEmployeeForm } from "../components/addEmployeeForm/addEmployeeForm";

export const AddEmployeePage = () => {
  const nav = useNavigate();
  return (
    <>
      <header>
        <Button onClick={() => nav("/")} variant="contained">
          Return to Home Page
        </Button>
      </header>
      <div>
        <h1 style={{ margin: "2%" }}>Create employee page</h1>
        <AddEmployeeForm />
      </div>
    </>
    //enter details about my add employee page
  );
};
