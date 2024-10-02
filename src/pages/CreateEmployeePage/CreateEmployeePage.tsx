import { useNavigate } from "react-router-dom";
import { createEmployee } from "../../services/employee";

import { EmployeeFormData } from "../../components/EmployForm/schema";
import EmployeeForm from "../../components/EmployForm/EmployeeForm";
// import styles from "./CreateEmployee.module.scss";

const CreateEmployeePage = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: EmployeeFormData) => {
    console.log("data", data);
    createEmployee(data)
      .then(() => {
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <EmployeeForm onSubmit={onSubmit} formType="create" />
    </div>
  );
};

export default CreateEmployeePage;
