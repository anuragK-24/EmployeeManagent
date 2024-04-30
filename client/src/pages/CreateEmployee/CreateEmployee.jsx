import { useState } from "react";
import LabelledInput from "../../components/LabelledInput/LabelledInput";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./CreateEmployee.scss";

export default function CreateEmployee() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    desgination: "",
    gender: "",
    course: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const response = await fetch("http://localhost:3000/emp/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      navigate("/allEmployee");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };
  return (
    <div className="CreateEmployee">
      <h1 className="CreateEmployee_Heading">Create Employee</h1>
      <div className="CreateEmployee_Content">
        <div className="CreateEmployee_Content_FormContainer">
          <form
            className="CreateEmployee_Content_FormContainer_Form"
            onSubmit={handleSubmit}
          >
            <LabelledInput
              label={"Name"}
              value={formData.name}
              placeholder={"Name"}
              type="text"
              name="name"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
            />
            <LabelledInput
              label={"Email"}
              value={formData.email}
              placeholder={"Email"}
              type="email"
              name="email"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label={"Mobile No."}
              value={formData.mobile}
              type="number"
              placeholder={"Mobile No."}
              name="mobile"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  mobile: e.target.value,
                });
              }}
            />
            <LabelledInput
              label={"Designation"}
              value={formData.desgination} // corrected typo here
              placeholder={"Designation"}
              type="text"
              name="designation"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  desgination: e.target.value,
                });
              }} // pass the whole event, not just the value
            />
            <LabelledInput
              label={"Gender"}
              value={formData.gender}
              placeholder={"Gender"}
              type="text"
              name="gender"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  gender: e.target.value,
                });
              }}
            />
            <LabelledInput
              label={"Course"}
              value={formData.course}
              placeholder={"Course"}
              type="text"
              name="course"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  course: e.target.value,
                });
              }}
            />
            <LabelledInput
              label={"Image"}
              type="text"
              placeholder={"Image"}
              id={"image"}
              value={formData.image}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  image: e.target.value,
                });
              }}
            />

            <button
              className="CreateEmployee_Content_FormContainer_Form_Button"
              type="submit"
            >
              Create
            </button>
          </form>
          {/* {error && (
            <div className={"CreateEmployee_Content_FormContainer_Form_Error"}>
              There was an error creating a listing! Try again.
            </div>
          )}
          {emptyFields && (
            <div className={"CreateEmployee_Content_FormContainer_Form_Error"}>
              All fields must be filled!
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
