import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AddButton = () => {
  const nav = useNavigate();

  return (
    <button onClick={() => nav("/create")}>
      <AddCircleIcon fontSize="medium" />
      Add Button
    </button>
  );
};
