import PropTypes from "prop-types";
import TableRow from "../TableRow/TableRow";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { Link } from "react-router-dom";
import LabelledInput from "../LabelledInput/LabelledInput";
import "./Employees.scss";
import emptyImage from "../../assets/empty.svg";
export default function Employees() {
  const [hasReloaded, setHasReloaded] = useState(false);
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

    if (searchValue === "" && !hasReloaded) {
      setHasReloaded(true);
      window.location.reload();
    } else {
      const filteredData = employees.filter((emp) =>
        emp.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setEmployees(filteredData);
    }
  };
  return (
    <div className="Empolyees">
      <LabelledInput
        onChange={handleSearch}
        classN={"Search"}
        value={searchValue}
        placeholder={"Search by employee name"}
        label="Search"
        type="text"
      />
      <h3>Total count : {employees.length} </h3>
      <div className="Empolyees__Create">
        <Link to="/createEmployee">Create Employee</Link>
      </div>
      <div className="Empolyees__Table">
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

          {employees.length !== 0 ? (
            employees.map((emp) => <TableRow key={emp._id} rowData={emp} />)
          ) : (
            <tr>
              <td className="Empolyees__Table__NoData" colSpan="10">
                <h2 className="Empolyees__Table__NoData__Text">
                  No Employee Found
                </h2>
              </td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
}

Employees.propTypes = {
  data: PropTypes.array,
};

Employees.defaultProps = {
  data: [],
};
