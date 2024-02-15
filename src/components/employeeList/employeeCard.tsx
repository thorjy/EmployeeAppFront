import React from "react";
import "./employeeCard.css";
import { EditButton } from "../editEmployee/editButton";
import { DeleteButton } from "../deleteEmployee/deleteButton";

interface cardProps {
  name: string;
  department: string;
  salary: number;
  id: number;
}
export const EmployeeCard: React.FC<cardProps> = (props) => {
  return (
    <div className="employeeCard">
      <div className="cardLeft">
        <h2>{props.name}</h2>
        <p>{props.department}</p>
        <p>{props.salary}</p>
      </div>
      <div className="cardRight">
        <EditButton employee={props} />
        <DeleteButton employee={props} />
      </div>
    </div>
  );
};
