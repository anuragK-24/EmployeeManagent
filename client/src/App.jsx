import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import { UserProvider, useUser } from "./context/UserContext";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import NavBar from "./components/NavBar/NavBar";
import Employees from "./components/Employees/Employees";
import CreateEmployee from "./pages/CreateEmployee/CreateEmployee";
import UpdateEmployee from "./pages/UpdateEmployee/UpdateEmployee";

function App() {
  return (
    <UserProvider>
      <Router>
        <ProtectedNavBarRoute />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/adminPanel" element={<ProtectedRoute />} />
          <Route path="/" element={<ProtectedAdminRoute />} />
          <Route path="/allEmployee" element={<ProtectedEmployeesRoute />} />
          <Route
            path="/createEmployee"
            element={<ProtectedCreateEmployeeRoute />}
          />
          <Route
            path="/updateEmployee/:id"
            element={<ProtectedUpdateEmployeeRoute />}
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

function ProtectedRoute() {
  const { user } = useUser();
  return user ? <Dashboard /> : <Login />;
}
function ProtectedAdminRoute() {
  const { user } = useUser();
  return user ? <AdminPanel /> : <Login />;
}
function ProtectedNavBarRoute() {
  const { user } = useUser();
  return user && <NavBar />;
}
function ProtectedEmployeesRoute() {
  const { user } = useUser();
  return user ? <Employees /> : <Login />;
}
function ProtectedCreateEmployeeRoute() {
  const { user } = useUser();
  return user ? <CreateEmployee /> : <Login />;
}
function ProtectedUpdateEmployeeRoute() {
  const { user } = useUser();
  return user ? <UpdateEmployee /> : <Login />;
}
export default App;
