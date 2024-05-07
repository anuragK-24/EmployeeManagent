import { useEffect, useState } from "react";
import LabelledInput from "../../components/LabelledInput/LabelledInput";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./UpdateEmployee.scss";
import imgIcon from "../../assets/image_icon.png";

export default function UpdateEmployee() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);
  const { id } = useParams();
  const [initalImage, setInitialImage] = useState(null);
  // console.log("Value of id ", id);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: [],
    image: null,
  });
  console.log(formData.image)
  const findEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:3000/emp/find/` + id, {
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
      setFormData({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        designation: data.designation,
        gender: data.gender,
        course: data.course,
      });
      setInitialImage(data.image);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    findEmployee();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.image);
    try {
      let filename = null;
      if (formData.image) {
        const uploadData = new FormData();
        filename = formData.image.name;
        uploadData.append("filename", filename);

        // Append the image file directly
        uploadData.append("image", formData.image, filename);

        const options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: uploadData,
        };

        await fetch("http://localhost:3000/upload/image", options);
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
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: filename === null ? initalImage : filename,
        }),
      };

      const response = await fetch(
        `http://localhost:3000/emp/update/` + id,
        options
      );
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
    <div className="UpdateEmployee">
      <h1 className="UpdateEmployee_Heading">Employee Edit</h1>
      <div className="UpdateEmployee_Content">
        <div className="UpdateEmployee_Content_FormContainer">
          <form
            className="UpdateEmployee_Content_FormContainer_Form"
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
            <div style={{ marginBottom: "12px" }}>
              <label className="UpdateEmployee_Content_FormContainer_Form_Label">
                Designation{" "}
              </label>
              <select
                value={formData.designation}
                name="designation"
                className="UpdateEmployee_Content_FormContainer_Form_Select"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    designation: e.target.value,
                  });
                }}
              >
                <option value="">Select designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label className="UpdateEmployee_Content_FormContainer_Form_Label">
                Gender
              </label>
              <div>
                <input
                  type="radio"
                  value="M"
                  checked={formData.gender === "M"}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      gender: e.target.value,
                    });
                  }}
                />
                M
                <input
                  type="radio"
                  value="F"
                  checked={formData.gender === "F"}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      gender: e.target.value,
                    });
                  }}
                />
                F
              </div>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label className="UpdateEmployee_Content_FormContainer_Form_Label">
                Course:
              </label>
              <div>
                <input
                  type="checkbox"
                  value="MCA"
                  checked={formData.course.includes("MCA")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        course: [...formData.course, e.target.value],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        course: formData.course.filter(
                          (course) => course !== e.target.value
                        ),
                      });
                    }
                  }}
                />
                MCA
                <input
                  type="checkbox"
                  value="BCA"
                  checked={formData.course.includes("BCA")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        course: [...formData.course, e.target.value],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        course: formData.course.filter(
                          (course) => course !== e.target.value
                        ),
                      });
                    }
                  }}
                />
                BCA
                <input
                  type="checkbox"
                  value="BSC"
                  checked={formData.course.includes("BSC")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        course: [...formData.course, e.target.value],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        course: formData.course.filter(
                          (course) => course !== e.target.value
                        ),
                      });
                    }
                  }}
                />
                BSC
              </div>
              {/* </label> */}
            </div>
            <div style={{ marginBottom: "12px" }}>
              <label htmlFor="image">
                Photo <img style={{ height: "1.2em" }} src={imgIcon} alt="" />
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
              
              {formData.image ? (
                <div style={{ marginTop: "12px" }}>
                  
                  Photo: {formData.image.name}
                </div>
              ) : (
                <div style={{ marginTop: "12px" }}>
                  {" "}
                  <img
                    style={{ height: "30px", width: "30px" }}
                    src={`http://localhost:3000/images/${initalImage}`}
                    alt=""
                  />
                </div>
              )}
            </div>
            <button
              className="UpdateEmployee_Content_FormContainer_Form_Button"
              type="submit"
            >
              Edit
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
