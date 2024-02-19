// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { useNavigate } from "react-router-dom";

// export const AddButton = () => {
//   const nav = useNavigate();

//   return (
//     <button onClick={() => nav("/create")}>
//       <AddCircleIcon fontSize="medium" />
//       Add Button
//     </button>
//   );
// };

import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";

export const AddButton = () => {
  const nav = useNavigate();

  const handleButtonClick = () => {
    nav("/create");
  };

  return (
    <button onClick={handleButtonClick} className="add-button">
      <AddCircleIcon fontSize="large" />
      <span className="button-text">Add Button</span>
    </button>
  );
};
