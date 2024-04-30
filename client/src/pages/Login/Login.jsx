import { Link, useNavigate} from "react-router-dom";
import "./Login.scss";
import LabelledInput from "../../components/LabelledInput/LabelledInput";
import { useState } from "react";

export default function Login() {
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
      navigate("/dashboard");
      console.log("Login successful")
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="Login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
      </form>
      <p>
        Dont have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        Forgot your password? <Link to="/forgot-password">Reset</Link>
      </p>
    </div>
  );
}
