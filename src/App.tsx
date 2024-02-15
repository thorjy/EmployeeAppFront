import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/homePage";
import { AddEmployeePage } from "./pages/addEmployeePage";
import { EditEmployeePage } from "./pages/editEmployeePage";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/create" element={<AddEmployeePage />} />
          <Route path="/edit" element={<EditEmployeePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
