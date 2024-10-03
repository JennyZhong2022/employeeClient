import { useEffect, useState } from "react";
import {
  deleteEmployeeById,
  EmployeeResponse,
  getAllEmployees,
  searchForEmployeeByFilter,
  searchForEmployeeName,
} from "../../services/employee";
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard";
import styles from "./EmployeesPage.module.scss";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../modals/ConfirmModal/ConfirmModal";
import SearchBar from "../../components/SearchBar/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import FilterModal from "../../modals/FilterModal/FilterModal";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchTerm } from "../../redux/searchSlice";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import {
  clearFilters,
  setBasisFilter,
  setNameFilter,
  setStatusFilter,
} from "../../redux/filterSlice";

const EmployeesPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  //redux states
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const { name, employmentStatus, employmentBasis } = useSelector(
    (state: RootState) => state.filter
  );

  // local states
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [selectedEmployeeFirstName, setSelectedEmployeeFirstName] = useState<
    string | null
  >(null);
  const [selectedEmployeeLastName, setSelectedEmployeeLastName] = useState<
    string | null
  >(null);

  // get different data depends on request
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);

      try {
        let data: EmployeeResponse[] = [];
        if (searchTerm) {
          data = await searchForEmployeeName(searchTerm);
        } else if (name || employmentStatus || employmentBasis) {
          data = await searchForEmployeeByFilter(
            name.trim() !== "" ? name.trim() : undefined,
            employmentStatus !== "" ? employmentStatus : undefined,
            employmentBasis !== "" ? employmentBasis : undefined
          );
        } else {
          data = await getAllEmployees();
        }
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees", error);
        setError("Error fetching employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [searchTerm, name, employmentStatus, employmentBasis]);

  const handleGetAllEmployees = async () => {
    dispatch(clearFilters());
    dispatch(clearSearchTerm());
  };

  console.log("employees", employees);

  const handleDelete = (id: number, firstName: string, lastName: string) => {
    setSelectedEmployeeFirstName(firstName);
    setSelectedEmployeeLastName(lastName);
    setSelectedEmployeeId(id);
    setOpenConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedEmployeeId === null) return;

    const isConfirmed = await deleteEmployeeById(selectedEmployeeId).catch(
      (e) => {
        console.log(e);
        return false;
      }
    );

    if (isConfirmed) {
      setEmployees(
        employees.filter((employee) => employee.id !== selectedEmployeeId)
      );
    }

    setOpenConfirmModal(false);
    setSelectedEmployeeId(null);
  };

  const handleAddEmployee = () => {
    navigate("/add-employee");
  };

  const handleApplyFilters = (
    newName: string,
    newStatus: string,
    newBasis: string
  ) => {
    dispatch(setNameFilter(newName));
    dispatch(setStatusFilter(newStatus));
    dispatch(setBasisFilter(newBasis));
    setOpenFilterModal(false);
  };

  return (
    <div className={styles.employeesList}>
      <div className={styles.employeesList__header}>
        <h1 className={styles.employeesList__title}>Employees' list</h1>
        <div className={styles.employeesList__subheader}>
          <p className={styles.employeesList__instruction}>
            Please click on "Edit" to find more details of each employee
          </p>
          <button
            className={styles.employeesList__button}
            onClick={handleAddEmployee}
          >
            Add employee
          </button>
        </div>
      </div>

      <div className={styles.employeesList__navBar}>
        {/* <SearchBar /> */}

        <div>
          <button
            onClick={() => setOpenFilterModal(true)}
            className={styles.employeesList__button}
          >
            <FontAwesomeIcon icon={faSliders} />
          </button>
          <FilterModal
            openFilterModal={openFilterModal}
            closeModal={() => setOpenFilterModal(false)}
            name={name}
            employmentStatus={employmentStatus}
            employmentBasis={employmentBasis}
            onApplyFilters={handleApplyFilters}
          />
        </div>

        <button
          className={styles.employeesList__button}
          onClick={handleGetAllEmployees}
        >
          All Employees
        </button>
      </div>
      {loading && (
        <div className={styles.employeesList__loading}>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      )}
      {error && (
        <div className={styles.employeesList__errorMessage}>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
      {!loading &&
        !error &&
        employees.map((employee) => (
          <EmployeeCard
            employee={employee}
            key={employee.id}
            onDelete={handleDelete}
          />
        ))}
      <ConfirmModal
        isOpen={openConfirmModal}
        onRequestClose={() => setOpenConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployeeFirstName} ${selectedEmployeeLastName}?`}
      />
    </div>
  );
};

export default EmployeesPage;
