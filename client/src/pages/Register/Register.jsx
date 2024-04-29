import LabelledInput from "../../components/LabelledInput/LabelledInput";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { useHistory } from "react-router-dom";
import "./Register.scss";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  //   const history = useHistory();
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
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      history.push("/login");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="Register">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <LabelledInput
          id="email"
          errorMsg={errorMsg}
          label="Email"
          type="email"
          value={formData.email}    
          onChange={handleChange}
        />
        <LabelledInput
          id="password"
          label="Password"
          errorMsg={errorMsg}
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>

      <p>
        Forgot your password? <Link to="/forgot-password">Reset</Link>
      </p>
    </div>
  );
}
