import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EditEmployeeForm } from "../components/editEmployee/editEmployeeForm";

export const EditEmployeePage = () => {
  const nav = useNavigate();
  return (
    <>
      <header>
        <Button onClick={() => nav("/")} variant="contained">
          Return to Home Page
        </Button>
      </header>
      <div>
        <h1 style={{ margin: "2%" }}>Edit employee page</h1>
        <EditEmployeeForm />
      </div>
    </>
    //enter details about my add employee page
  );
};
