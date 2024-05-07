import { useNavigate } from "react-router-dom";
import "./TableRow.scss";
import { useUser } from "../../context/UserContext";
import editImage from "../../assets/edit.svg";
import deleteImage from "../../assets/delete.svg";

export default function TableRow({ rowData }) {
  const { user } = useUser();
  const navigate = useNavigate();
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().substr(-2); // Extract last two digits of the year
    return `${day}-${month}-${year}`;
  }
  const handleEdit = () => {
    navigate(`/updateEmployee/${rowData._id}`);
  };
  const handleDelete = async () => {
    alert("Are you sure you want to delete this employee?");
    try {
      const response = await fetch(
        `http://localhost:3000/emp/delete/` + rowData._id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      window.location.reload(); // Refresh the current page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <table className="TableRow">
    <tr className="TableRow">
      <td className="TableRow__Id">{rowData._id}</td>
      <td className="TableRow__Image">
        <img
          style={{ height: "30px", width: "30px" }}
          src={`http://localhost:3000/images/${rowData.image}`}
          alt=""
        />
      </td>
      <td className="TableRow__Name">{rowData.name}</td>
      <td className="TableRow__Email">{rowData.email}</td>
      <td className="TableRow__Mobile">{rowData.mobile}</td>
      <td className="TableRow__Designation">{rowData.designation}</td>
      <td className="TableRow__Gender">{rowData.gender}</td>
      <td className="TableRow__Course">{rowData.course.join(", ")}</td>
      <td className="TableRow__Date">{formatDate(rowData.createdDate)}</td>
      <td className="TableRow__Action">
        <img
          title="Edit"
          className="TableRow__Action__Edit"
          onClick={handleEdit}
          src={editImage}
          alt=""
        />

        <img
          title="Delete"
          className="TableRow__Action__Delete"
          onClick={handleDelete}
          src={deleteImage}
          alt=""
        />
      </td>
    </tr>
    // </table>
  );
}
