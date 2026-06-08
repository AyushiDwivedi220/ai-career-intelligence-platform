import { useState } from "react";
import API from "../api/authApi";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    target_role: "",
    timeline_months: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        target_companies: [],
      };

      const response = await API.post(
        "/auth/register/",
        payload
      );

      console.log(response.data);

      alert("Registration Successful!");
    } catch (error) {
      console.error(error.response?.data);
      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />

        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br />

        <input
          type="text"
          name="target_role"
          placeholder="Target Role"
          onChange={handleChange}
        />

        <br />

        <input
          type="number"
          name="timeline_months"
          placeholder="Timeline Months"
          onChange={handleChange}
        />

        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;