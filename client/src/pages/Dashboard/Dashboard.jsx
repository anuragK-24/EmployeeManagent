import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';

export default function Dashboard() {
  const { user,  logoutUser } = useUser();
  const [employees, setEmployees] = useState([]);

  if (!user ) {
    return <div>User is not logged in</div>;
  } 
  const allEmployee = async () => {
    try {
      const response = await fetch("http://localhost:3000/emp/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setEmployees(data)
      console.log(data);
    }
    catch (error) {
      console.log(error);
    }
  }
  // allEmployee();
  // useEffect(() => {
  //   allEmployee();
  // }
  // ,[employees]);

  return (
    <div>
      {/* user: {user.others.username} */}
      <h1>Dashboard</h1>
      <h3>Employee List</h3>
      {employees.length !== 0 &&
      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>
            {emp.name} - {emp.email}
          </li>
        ))}
      </ul>
      }
      <br />
      <button onClick={()=>allEmployee()}>Get all employee</button>
      <button onClick={logoutUser}>logout</button>
    </div>
  );
}