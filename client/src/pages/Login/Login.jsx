import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import LabelledInput from "../../components/LabelledInput/LabelledInput";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import Login_image from "../../assets/signIn.svg";

export default function Login() {
  const { loginUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      loginUser(data);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="Login">
      <h1 className="Login_Heading">Login</h1>
      <div className="Login_Content">
        <div className="Login_Content_Image">
          <img src={Login_image} alt="Login" />
        </div>

        <div className="Login_Content_FormContainer">
          <form
            className="Login_Content_FormContainer_Form"
            onSubmit={handleSubmit}
          >
            <LabelledInput
              value={formData.email}
              onChange={handleChange}
              id="email"
              label="Email"
              errorMsg={errorMsg}
              type="email"
            />
            <LabelledInput
              htmlFor="email"
              id="password"
              value={formData.password}
              onChange={handleChange}
              label="Password"
              errorMsg={errorMsg}
              type="password"
            />

            <button type="submit">Login</button>
            <p>
              Dont have an account? <Link to="/register">Register</Link>
            </p>
            <p>
              Forgot your password? <Link to="/forgot-password">Reset</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
