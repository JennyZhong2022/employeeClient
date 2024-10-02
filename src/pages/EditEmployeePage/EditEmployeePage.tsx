import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  EmployeeResponse,
  updateEmployeeById,
  transformEmployeeData,
} from "../../services/employee";
import { EmployeeFormData } from "../../components/EmployForm/schema";
import EmployeeForm from "../../components/EmployForm/EmployeeForm";

type FetchStatus = "IDLE" | "LOADING" | "SUCCESS" | "FAILURE";

const EditEmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<EmployeeFormData | null>(null);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("IDLE");
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setFetchStatus("LOADING");
      getEmployeeById(Number(id))
        .then((employeeData: EmployeeResponse) => {
          setEmployee(transformEmployeeData(employeeData));
          setFetchStatus("SUCCESS");
        })
        .catch((error: Error) => {
          setError(error);
          setFetchStatus("FAILURE");
        });
    }
  }, [id]);

  const handleUpdateEmployee = async (data: EmployeeFormData) => {
    updateEmployeeById(Number(id), data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to fetch employee post:", error);
      });
  };

  return (
    <>
      {fetchStatus === "FAILURE" && <p>Loading</p>}
      {fetchStatus === "FAILURE" && <p>{error?.message}</p>}
      {fetchStatus === "SUCCESS" && employee && (
        <EmployeeForm
          employee={employee}
          onSubmit={handleUpdateEmployee}
          formType="edit"
        />
      )}
    </>
  );
};

export default EditEmployeePage;
