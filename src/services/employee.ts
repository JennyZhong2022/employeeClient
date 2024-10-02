import { EmployeeFormData } from "../components/EmployForm/schema";
import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface EmployeeResponse {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  employeeStatus: "Permanent" | "Contract" | "Casual";
  startDate: string; // ISO date string
  finishDate: string | null; // ISO date string or null
  onGoing: boolean;
  employmentBasis: "Full-time" | "Part-time";
  hoursPerWeek: number | null;
  createdAt: string | number | Date;
}

export function transformEmployeeData(
  employee: EmployeeResponse
): EmployeeFormData {
  const startDate = employee.startDate ? new Date(employee.startDate) : null;
  const finishDate = employee.finishDate ? new Date(employee.finishDate) : null;

  return {
    firstName: employee.firstName,
    middleName: employee.middleName || undefined,
    lastName: employee.lastName,
    email: employee.email,
    mobile: employee.mobile,
    address: employee.address,
    employeeStatus:
      employee.employeeStatus as EmployeeFormData["employeeStatus"],
    startDay: startDate ? startDate.getDate() : 1,
    startMonth: startDate
      ? (startDate.toLocaleString("default", {
          month: "long",
        }) as EmployeeFormData["startMonth"])
      : "January",
    startYear: startDate ? startDate.getFullYear() : new Date().getFullYear(),
    finishDay: finishDate ? finishDate.getDate() : null,
    finishMonth: finishDate
      ? (finishDate.toLocaleString("default", {
          month: "long",
        }) as EmployeeFormData["finishMonth"])
      : null,
    finishYear: finishDate ? finishDate.getFullYear() : null,
    onGoing: employee.onGoing,
    employmentBasis:
      employee.employmentBasis as EmployeeFormData["employmentBasis"],
    hoursPerWeek: employee.hoursPerWeek || null,
  };
}

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${baseURL}/employees`);
    return response.data as EmployeeResponse[];
  } catch (error) {
    throw new Error("Failed to fetch employees");
  }
};

// Create a new employee
export const createEmployee = async (data: EmployeeFormData) => {
  try {
    const response = await axios.post(`${baseURL}/employees`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data as EmployeeResponse;
  } catch (error) {
    throw new Error("Failed to create employee");
  }
};

// Fetch employee by ID
export const getEmployeeById = async (id: number) => {
  try {
    const response = await axios.get(`${baseURL}/employees/${id}`);
    return response.data as EmployeeResponse;
  } catch (error) {
    throw new Error("Failed to fetch employee by ID");
  }
};

// Update employee by ID
export const updateEmployeeById = async (
  id: number,
  data: EmployeeFormData
) => {
  try {
    const response = await axios.patch(`${baseURL}/employees/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data as EmployeeResponse;
  } catch (error) {
    throw new Error("Failed to update employee");
  }
};

// Delete employee by ID
export const deleteEmployeeById = async (id: number) => {
  try {
    await axios.delete(`${baseURL}/employees/${id}`);
    return true;
  } catch (error) {
    throw new Error("Failed to delete employee");
  }
};

// Delete all employees
export const deleteAllEmployee = async () => {
  try {
    await axios.delete(`${baseURL}/employees`);
    return true;
  } catch (error) {
    throw new Error("Failed to delete all employees");
  }
};

export const searchForEmployeeName = async (employeeName: string) => {
  try {
    const response = await axios.get(
      `${baseURL}/employees/name/${employeeName}`
    );
    return response.data as EmployeeResponse[];
  } catch (error) {
    throw new Error("Failed to search employee");
  }
};

export const searchForEmployeeNameByEmployeeStatus = async (status: string) => {
  try {
    const response = await axios.get(`${baseURL}/employees/status/${status}`);
    return response.data as EmployeeResponse[];
  } catch (error) {
    throw new Error(`Failed to search employee with status: + ${status}"`);
  }
};

export const searchForEmployeeByFilter = async (
  name?: string,
  status?: string,
  basis?: string
): Promise<EmployeeResponse[]> => {
  try {
    const params: any = {};
    if (name && name.trim() !== "") params.name = name.trim();
    if (status && status.trim() !== "") params.status = status.trim();
    if (basis && basis.trim() !== "") params.basis = basis.trim();

    const response = await axios.get(`${baseURL}/employees/filter`, { params });
    return response.data as EmployeeResponse[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to search employees with the provided filters.");
  }
};
