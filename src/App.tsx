import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateEmployeePage from "./pages/CreateEmployeePage/CreateEmployeePage";
import EmployeesPage from "./pages/EmployeesPage/EmployeesPage";
import EditEmployeePage from "./pages/EditEmployeePage/EditEmployeePage";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<EmployeesPage />} />
          <Route path="/add-employee" element={<CreateEmployeePage />} />
          <Route path="/employee/:id/edit" element={<EditEmployeePage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
