import { useState } from "react";
import LabelledInput from "../../components/LabelledInput/LabelledInput";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./CreateEmployee.scss";
import imgIcon from "../../assets/image_icon.png";

// Import request and crypto
import { v4 as uuidv4 } from "uuid";

export default function CreateEmployee() {
  const { user } = useUser();
  const [error, setError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.image);
    try {
      let filename = null;
      if (formData.image) {
        const uploadData = new FormData();
        filename = formData.image.name;
        uploadData.append("filename", filename);

        // Fetch the image file as a Blob
        const response = await fetch(formData.image);
        const blob = await response.blob();

        uploadData.append("image", blob, filename);

        const options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: uploadData,
        };

        await fetch("http://localhost:3000/upload/image", options);
      } else {
        setEmptyFields(true);
        setTimeout(() => {
          setEmptyFields(false);
        }, 2500);
        return;
      }

      if (
        formData.name === "" ||
        formData.email === "" ||
        formData.mobile === "" ||
        formData.designation === "" ||
        formData.gender === "" ||
        formData.course === ""
      ) {
        setEmptyFields(true);
        setTimeout(() => {
          setEmptyFields(false);
        }, 2500);
        return;
      }

      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: filename,
        }),
      };

      const response = await fetch("http://localhost:3000/emp/create", options);
      const newEmployee = await response.json();
      console.log(newEmployee);
      navigate(`/allEmployee`);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
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
              value={formData.designation} // corrected typo here
              placeholder={"Designation"}
              type="text"
              name="designation"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  designation: e.target.value,
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

            <div className="">
              <label htmlFor="image">
                Photo{" "}
                <img
                  style={{ height: "2em", width: "2em" }}
                  src={imgIcon}
                  alt=""
                />
              </label>
              <input
                type="file"
                id="image"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    image: e.target.files[0],
                  });
                }}
              />
              {formData.image && (
                <div style={{ marginTop: "12px" }}>
                  Photo name: {formData.image.name}
                </div>
              )}
            </div>

            <button
              className="CreateEmployee_Content_FormContainer_Form_Button"
              type="submit"
            >
              Create
            </button>
          </form>
          {error && (
            <div className={"CreateEmployee_Content_FormContainer_Form_Error"}>
              There was an error creating a listing! Try again.
            </div>
          )}
          {emptyFields && (
            <div className={"CreateEmployee_Content_FormContainer_Form_Error"}>
              All fields must be filled!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
