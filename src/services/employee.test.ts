import { describe, it, expect, MockedFunction } from "vitest";
import {
  createEmployee,
  deleteEmployeeById,
  EmployeeResponse,
  getAllEmployees,
  getEmployeeById,
  searchForEmployeeByFilter,
  searchForEmployeeName,
  updateEmployeeById,
} from "./employee";
import axios from "axios";
import { EmployeeFormData } from "../components/EmployForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

// mock axios
vi.mock("axios");

const mockedGet = axios.get as MockedFunction<typeof axios.get>;
const mockedPost = axios.post as MockedFunction<typeof axios.post>;
const mockedPatch = axios.patch as MockedFunction<typeof axios.patch>;
const mockedDelete = axios.delete as MockedFunction<typeof axios.delete>;

describe("Employee Service", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // test get all employees
  it("should fetch and return employees data successfully", async () => {
    const mockEmployees: EmployeeResponse[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        mobile: "1234567890",
        address: "123 Main St",
        employeeStatus: "Permanent",
        startDate: "2023-01-01",
        finishDate: "2024-01-01",
        onGoing: true,
        employmentBasis: "Part-time",
        hoursPerWeek: 20,
        createdAt: "2023-01-01T00:00:00.000Z",
      },
    ];
    mockedGet.mockResolvedValueOnce({ data: mockEmployees });

    const result = await getAllEmployees();

    expect(mockedGet).toHaveBeenCalledWith(`${baseURL}/employees`);

    expect(result).toEqual(mockEmployees);
  });

  it("should throw an error when fetching employees fails", async () => {
    mockedGet.mockRejectedValueOnce(new Error("Network Error"));

    await expect(getAllEmployees()).rejects.toThrow(
      "Failed to fetch employees"
    );

    expect(mockedGet).toHaveBeenCalledWith(`${baseURL}/employees`);
  });

  // test create a new employee
  it("should create new employee data successfully", async () => {
    const mockEmployeeData: EmployeeFormData = {
      firstName: "Peter",
      lastName: "Dole",
      email: "peter.dole@example.com",
      mobile: "1234567890",
      address: "123 Main St",
      employeeStatus: "Permanent",
      startDay: 1,
      startMonth: "April",
      startYear: 2023,
      onGoing: true,
      employmentBasis: "Part-time",
      hoursPerWeek: 38,
      finishDay: null,
      finishMonth: null,
      finishYear: null,
    };

    const mockEmployeeResponse: EmployeeResponse = {
      id: 1,
      ...mockEmployeeData,
      startDate: "2023-4-01",
      finishDate: null,
      createdAt: "2023-01-01T00:00:00.000Z",
    };

    mockedPost.mockResolvedValueOnce({ data: mockEmployeeResponse });

    const result = await createEmployee(mockEmployeeData);

    expect(mockedPost).toHaveBeenCalledWith(
      `${baseURL}/employees`,
      mockEmployeeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(result).toEqual(mockEmployeeResponse);
  });

  it("should throw an error when creating new employee data fails", async () => {
    const mockEmployeeData: EmployeeFormData = {
      firstName: "Peter",
      lastName: "Dole",
      email: "peter.dole@example.com",
      mobile: "1234567890",
      address: "123 Main St",
      employeeStatus: "Permanent",
      startDay: 1,
      startMonth: "April",
      startYear: 2023,
      onGoing: true,
      employmentBasis: "Part-time",
      hoursPerWeek: 38,
      finishDay: null,
      finishMonth: null,
      finishYear: null,
    };

    mockedPost.mockRejectedValueOnce(new Error("Network Error"));

    await expect(createEmployee(mockEmployeeData)).rejects.toThrow(
      "Failed to create employee"
    );

    expect(mockedPost).toHaveBeenCalledWith(
      `${baseURL}/employees`,
      mockEmployeeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  // test  Fetch employee by ID
  it("should fetch and return an employee by ID successfully", async () => {
    const mockEmployeeResponse: EmployeeResponse = {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      mobile: "1234567890",
      address: "123 Main St",
      employeeStatus: "Permanent",
      startDate: "2023-4-01",
      finishDate: null,
      onGoing: true,
      employmentBasis: "Part-time",
      hoursPerWeek: 20,
      createdAt: "2023-01-01T00:00:00.000Z",
    };

    mockedGet.mockResolvedValueOnce({ data: mockEmployeeResponse });

    const result = await getEmployeeById(1);

    expect(mockedGet).toHaveBeenCalledWith(`${baseURL}/employees/1`);

    expect(result).toEqual(mockEmployeeResponse);
  });

  it("should throw an error when fetching employee by ID fails", async () => {
    mockedGet.mockRejectedValueOnce(new Error("Network Error"));

    await expect(getEmployeeById(1)).rejects.toThrow(
      "Failed to fetch employee by ID"
    );

    expect(mockedGet).toHaveBeenCalledWith(`${baseURL}/employees/1`);
  });

  // test Update employee by ID
  it("should update an employee by ID successfully", async () => {
    const mockEmployeeID = 1;

    const mockEmployeeData: EmployeeFormData = {
      firstName: "Jake",
      lastName: "Doe",
      email: "jake.doe@example.com",
      mobile: "1234567890",
      address: "123 Main St",
      employeeStatus: "Permanent",
      startDay: 1,
      startMonth: "April",
      startYear: 2023,
      onGoing: true,
      employmentBasis: "Part-time",
      hoursPerWeek: 20,
      finishDay: null,
      finishMonth: null,
      finishYear: null,
      middleName: undefined,
    };

    const mockEmployeeResponse: EmployeeResponse = {
      id: mockEmployeeID,
      ...mockEmployeeData,
      startDate: "2023-4-01",
      finishDate: null,
      createdAt: "2023-01-01T00:00:00.000Z",
    };

    mockedPatch.mockResolvedValueOnce({ data: mockEmployeeResponse });

    const result = await updateEmployeeById(mockEmployeeID, mockEmployeeData);

    expect(mockedPatch).toHaveBeenCalledWith(
      `${baseURL}/employees/${mockEmployeeID}`,
      mockEmployeeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    expect(result).toEqual(mockEmployeeResponse);
  });

  it("should throw an error when update an employee data fails", async () => {
    const mockEmployeeID = 1;
    const mockEmployeeData: EmployeeFormData = {
      firstName: "Peter",
      lastName: "Dole",
      email: "peter.dole@example.com",
      mobile: "1234567890",
      address: "123 Main St",
      employeeStatus: "Permanent",
      startDay: 1,
      startMonth: "April",
      startYear: 2023,
      onGoing: true,
      employmentBasis: "Part-time",
      hoursPerWeek: 38,
      finishDay: null,
      finishMonth: null,
      finishYear: null,
    };

    mockedPatch.mockRejectedValueOnce(new Error("Network Error"));

    await expect(
      updateEmployeeById(mockEmployeeID, mockEmployeeData)
    ).rejects.toThrow("Failed to update employee");

    expect(mockedPatch).toHaveBeenCalledWith(
      `${baseURL}/employees/${mockEmployeeID}`,
      mockEmployeeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  // test delete an employees by id
  it("should delete an employees successfully", async () => {
    const mockEmployeeID = 1;

    mockedDelete.mockResolvedValueOnce({});

    const result = await deleteEmployeeById(mockEmployeeID);

    expect(mockedDelete).toHaveBeenCalledWith(
      `${baseURL}/employees/${mockEmployeeID}`
    );

    expect(result).toBe(true);
  });

  it("should throw an error when deleting employee fails", async () => {
    const mockEmployeeID = 1;

    mockedDelete.mockRejectedValueOnce(new Error("Network Error"));

    await expect(deleteEmployeeById(mockEmployeeID)).rejects.toThrow(
      "Failed to delete employee"
    );

    expect(mockedDelete).toHaveBeenCalledWith(
      `${baseURL}/employees/${mockEmployeeID}`
    );
  });

  // test search by name
  it("should search and return employees by name successfully", async () => {
    const mockEmployeeName = "John";
    const mockSearchResults: EmployeeResponse[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        mobile: "1234567890",
        address: "123 Main St",
        employeeStatus: "Permanent",
        startDate: "2023-01-01",
        finishDate: null,
        onGoing: true,
        employmentBasis: "Part-time",
        hoursPerWeek: 20,
        createdAt: "2023-01-01T00:00:00.000Z",
      },
      {
        id: 2,
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
        mobile: "0987654321",
        address: "456 Elm St",
        employeeStatus: "Contract",
        startDate: "2023-01-01",
        finishDate: "2024-01-01",
        onGoing: false,
        employmentBasis: "Full-time",
        hoursPerWeek: 38,
        createdAt: "2023-05-01T00:00:00.000Z",
      },
    ];

    mockedGet.mockResolvedValueOnce({ data: mockSearchResults });

    const result = await searchForEmployeeName(mockEmployeeName);

    expect(mockedGet).toHaveBeenCalledWith(
      `${baseURL}/employees/name/${mockEmployeeName}`
    );

    expect(result).toEqual(mockSearchResults);
  });

  it("should throw an error when searching for employees fails", async () => {
    const mockEmployeeName = "John";
    mockedGet.mockRejectedValueOnce(new Error("Network Error"));

    await expect(searchForEmployeeName(mockEmployeeName)).rejects.toThrow(
      "Failed to search employee"
    );

    expect(mockedGet).toHaveBeenCalledWith(
      `${baseURL}/employees/name/${mockEmployeeName}`
    );
  });

  // test search by filters
  it("should search and return employees with all filters successfully", async () => {
    const name = "John";
    const status = "Permanent";
    const basis = "Full-time";

    const mockSearchResults: EmployeeResponse[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        mobile: "1234567890",
        address: "123 Main St",
        employeeStatus: "Permanent",
        startDate: "2023-01-01",
        finishDate: null,
        onGoing: true,
        employmentBasis: "Part-time",
        hoursPerWeek: 20,
        createdAt: "2023-01-01T00:00:00.000Z",
      },
    ];

    mockedGet.mockResolvedValueOnce({ data: mockSearchResults });

    const result = await searchForEmployeeByFilter(name, status, basis);
    expect(mockedGet).toHaveBeenCalledWith(`${baseURL}/employees/filter`, {
      params: { name, status, basis },
    });

    expect(result).toEqual(mockSearchResults);
  });

  it("should return all employees when no filters are provided", async () => {
    const name = undefined;
    const status = undefined;
    const basis = undefined;

    const mockSearchResults: EmployeeResponse[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        mobile: "1234567890",
        address: "123 Main St",
        employeeStatus: "Permanent",
        startDate: "2023-01-01",
        finishDate: null,
        onGoing: true,
        employmentBasis: "Part-time",
        hoursPerWeek: 20,
        createdAt: "2023-01-01T00:00:00.000Z",
      },
      {
        id: 2,
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
        mobile: "0987654321",
        address: "456 Elm St",
        employeeStatus: "Contract",
        startDate: "2023-01-01",
        finishDate: "2024-01-01",
        onGoing: false,
        employmentBasis: "Full-time",
        hoursPerWeek: 38,
        createdAt: "2023-05-01T00:00:00.000Z",
      },
    ];

    mockedGet.mockResolvedValueOnce({ data: mockSearchResults });

    const result = await searchForEmployeeByFilter(name, status, basis);

    // empty params
    expect(mockedGet).toHaveBeenCalledWith(`${baseURL}/employees/filter`, {
      params: {},
    });

    expect(result).toEqual(mockSearchResults);
  });

  it("should throw an error when searching for employees fails", async () => {
    const name = "Alice";
    const status = "Permanent";
    const basis = "Full-time";

    mockedGet.mockRejectedValueOnce(new Error("Network Error"));

    await expect(
      searchForEmployeeByFilter(name, status, basis)
    ).rejects.toThrow("Failed to search employees with the provided filters.");

    expect(mockedGet).toHaveBeenCalledWith(`${baseURL}/employees/filter`, {
      params: { name, status, basis },
    });
  });
});
