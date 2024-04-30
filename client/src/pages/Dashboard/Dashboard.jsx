import { useUser } from "../../context/UserContext";
import Employees from "../../components/Employees/Employees";
import { useEffect, useState } from "react";
import "./Dashboard.scss";
export default function Dashboard() {
  const { user, logoutUser } = useUser();
  const [employees, setEmployees] = useState([]);

  if (!user) {
    return <div>User is not logged in</div>;
  }
  const allEmployee = async () => {
    try {
      const response = await fetch("http://localhost:3000/emp/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setEmployees(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allEmployee();
  }, []);

  return (
    <div>
      {/* user: {user.others.username} */}
      <h1>Dashboard</h1>
      <h3>Employee List</h3>
      <h3>Employee List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
      </table>
      {employees.length !== 0 && <Employees data={employees} />}

      <button onClick={() => allEmployee()}>Get all employee</button>
      <button onClick={logoutUser}>logout</button>
    </div>
  );
}
