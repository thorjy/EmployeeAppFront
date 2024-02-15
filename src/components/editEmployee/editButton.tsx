import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Employee } from "../../features/employeeSlice";
import { IconButton } from "@mui/material";

interface employeeCardProps {
  employee: Employee;
}
export const EditButton: React.FC<employeeCardProps> = ({ employee }) => {
  const nav = useNavigate();

  return (
    <div>
      <IconButton
        aria-label="delete"
        sx={{ color: "rgb(245, 197, 7)" }}
        onClick={() => nav(`/edit?id=${employee.id}`)}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
};
