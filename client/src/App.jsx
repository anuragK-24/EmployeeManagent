import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import { UserProvider, useUser } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

function ProtectedRoute() {
  const { user } = useUser();
  return user ? <Dashboard /> : <Login />;
}

export default App;