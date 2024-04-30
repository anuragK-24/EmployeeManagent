import PropTypes from "prop-types";
import TableRow from "../TableRow/TableRow";
// import TableRow from "../TableRow/TableRow";
export default function Employees({ data }) {
  console.log(data[0]);
  return (
    <>

        {data.length !== 0 && (
            data.map((emp) => (
                <TableRow key={emp._id} rowData={emp} />
            ))
            
        )}
    </>
  );
}

Employees.propTypes = {
  data: PropTypes.array,
};

Employees.defaultProps = {
  data: [],
};
