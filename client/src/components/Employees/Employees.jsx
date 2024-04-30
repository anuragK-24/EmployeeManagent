import PropTypes from "prop-types";
import TableRow from "../TableRow/TableRow";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import LabelledInput from "../LabelledInput/LabelledInput";

export default function Employees() {
  const { user } = useUser();
  const [searchValue, setSearchValue] = useState("");
  const [employees, setEmployees] = useState([]);
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
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    const filteredData = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setEmployees(filteredData);
  }
  return (
    <>
      <div>
        <Link to="/createEmployee">Create Employee</Link>
      </div>
      <LabelledInput onChange={handleSearch} value={searchValue} label="Search" type="text" />
      <h3>Total count : {employees.length} </h3>
      <table>
        <thead>
          <tr>
            <th className="TableRow__Id">ID</th>
            <th className="TableRow__Image">Image</th>
            <th className="TableRow__Name">Name</th>
            <th className="TableRow__Email">Email</th>
            <th className="TableRow__Mobile">Mobile</th>
            <th className="TableRow__Designation">Designation</th>
            <th className="TableRow__Gender">Gender</th>
            <th className="TableRow__Course">Course</th>
            <th className="TableRow__Date">Created Date</th>
            <th className="TableRow__Action">Action</th>
          </tr>
        </thead>
        {employees.length !== 0 &&
          employees.map((emp) => <TableRow key={emp._id} rowData={emp} />)}
      </table>
    </>
  );
}

Employees.propTypes = {
  data: PropTypes.array,
};

Employees.defaultProps = {
  data: [],
};
