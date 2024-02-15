import { AddButton } from "./addEmployeeButton";
import "./topbar.css";

export const TopBar = () => {
  return (
    <div className="topbar">
      <h1>Employees</h1>
      <AddButton />
    </div>
  );
};
