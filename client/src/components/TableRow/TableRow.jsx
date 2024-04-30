import "./TableRow.scss";
export default function TableRow({ rowData }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().substr(-2); // Extract last two digits of the year
    return `${day}-${month}-${year}`;
  }
  return (
    <table className="TableRow">
      <tr>
        <td className="TableRow__Id">{rowData.id}</td>
        <td className="TableRow__Image">
          <img
            style={{ height: "30px", width: "30px" }}
            src={rowData.image}
            alt=""
          />
        </td>
        <td className="TableRow__Name">{rowData.name}</td>
        <td className="TableRow__Email">{rowData.email}</td>
        <td className="TableRow__Mobile">{rowData.mobile}</td>
        <td className="TableRow__Designation">{rowData.desgination}</td>
        <td className="TableRow__Gender">{rowData.gender}</td>
        <td className="TableRow__Course">{rowData.course}</td>
        <td className="TableRow__Date">{formatDate(rowData.createdDate)}</td>
        <td className="TableRow_Action"><button>Edit</button>/ <button>Delete</button></td>
      </tr>
    </table>
  );
}
