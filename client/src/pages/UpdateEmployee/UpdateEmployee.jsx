import { useEffect, useState } from "react";
import LabelledInput from "../../components/LabelledInput/LabelledInput";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function UpdateEmployee() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const { id } = useParams();
  console.log("Value of id ", id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    desgination: "",
    gender: "",
    course: "",
    image: "",
  });
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
        desgination: data.desgination,
        gender: data.gender,
        course: data.course,
        image: data.image,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    findEmployee();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const response = await fetch(`http://localhost:3000/emp/update/`+id, {
        method: "PUT",
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
    <div className="YachtEdit">
      <h1 className="YachtEdit_Heading">YachtEdit</h1>
      <div className="YachtEdit_Content">
        <div className="YachtEdit_Content_FormContainer">
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
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
