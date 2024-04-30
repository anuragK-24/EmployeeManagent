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
        <td className="TableRow__Data">{rowData.id}</td>
        <td className="TableRow__Data">
          <img
            style={{ height: "30px", width: "30px" }}
            src={rowData.image}
            alt=""
          />
        </td>
        <td>{rowData.name}</td>
        <td>{rowData.email}</td>
        <td>{rowData.mobile}</td>
        <td>{rowData.desgination}</td>
        <td>{rowData.gender}</td>
        <td>{rowData.course}</td>
        <td>{formatDate(rowData.createdDate)}</td>
        <td><button>Edit</button>/ <button>Delete</button></td>
      </tr>
    </table>
  );
}
