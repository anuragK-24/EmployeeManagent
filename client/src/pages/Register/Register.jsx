import LabelledInput from "../../components/LabelledInput/LabelledInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.scss";
import signUp_image from "../../assets/signUp.svg";
export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      navigate("/login");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="Register">
      <h1 className="Register_Heading">Register</h1>
      <div className="Register_Content">

        <div className="Register_Content_FormContainer">
          <form
            className="Register_Content_FormContainer_Form"
            onSubmit={handleSubmit}
          >
            <LabelledInput
              id="username"
              errorMsg={errorMsg}
              placeholder={"Type your Name"}
              label="Name"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
            <LabelledInput
              id="email"
              errorMsg={errorMsg}
              placeholder={"Type your Email"}
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <LabelledInput
              id="password"
              label="Password"
              placeholder={"Type Password"}
              errorMsg={errorMsg}
              type="password"
              value={formData.password}
              onChange={handleChange}
            />

            <p style={{fontSize:"0.8em"}}>
              Already have an account? <Link to="/login">Login</Link>
            </p>

            <button type="submit" className="Register_Content_FormContainer_Form_Button">Register</button>
          </form>
        </div>
        <div className="Register_Content_Image">
          <img src={signUp_image} alt="Register" />
        </div>

      </div>
    </div>
  );
}
