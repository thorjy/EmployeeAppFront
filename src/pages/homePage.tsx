import { EmployeeContainer } from "../components/employeeList/employeeContainer";
import { TopBar } from "../components/topbar/topbar";

export const Home = () => {
  return (
    <div>
      <header>
        <TopBar />
      </header>
      <EmployeeContainer />
      <div></div>
    </div>
  );
};
