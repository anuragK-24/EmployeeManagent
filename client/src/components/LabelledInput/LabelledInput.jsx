import PropTypes from "prop-types";
import "./LabelledInput.scss";

export default function LabelledInput({
  label,
  placeholder,
  value,
  type,
  onChange,
  errorMsg,
  id,
  name,
  htmlFor,
  classN,
}) {
  return (
    <div className={`LabelledInput ${classN}`}>
    {label && <div className="LabelledInput__Label">{label}</div>}
    <input
      className={`LabelledInput__Input ${errorMsg && errorMsg.length > 0 ? 'LabelledInput__Input--Error' : ''}`}
      type={type}
      placeholder={errorMsg || placeholder}
      onChange={onChange}
      title={errorMsg}
      value={value}
      id = {id}
      name = {name}
      htmlFor={htmlFor}
      required
    />
  </div>
  );
}

LabelledInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  errorMsg: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  htmlFor: PropTypes.string,
  classN: PropTypes.string,
};

LabelledInput.defaultProps = {
  label: "",
  placeholder: "",
  type: "text",
  value: "",
  errorMsg: "",  
  id: "",
  name: "",
  htmlFor: "",
  classN: "",
};