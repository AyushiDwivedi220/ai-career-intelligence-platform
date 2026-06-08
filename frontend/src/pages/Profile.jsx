import { useEffect, useState } from "react";
import API from "../api/authApi";

function Profile() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    target_role: "",
    target_companies: "",
    timeline_months: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/auth/profile/");

        setFormData({
          username: response.data.username,
          email: response.data.email,
          target_role: response.data.target_role || "",
          target_companies:
            response.data.target_companies.join(", "),
          timeline_months:
            response.data.timeline_months || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

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
        username: formData.username,
        email: formData.email,
        target_role: formData.target_role,
        target_companies: formData.target_companies
          .split(",")
          .map((company) => company.trim())
          .filter(Boolean),
        timeline_months: Number(
          formData.timeline_months
        ),
      };

      const response = await API.put(
        "/auth/profile/",
        payload
      );

      console.log(response.data);

      alert("Profile Updated Successfully!");
    } catch (error) {
      console.error(error.response?.data);
      alert("Update Failed");
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="target_role"
          placeholder="Target Role"
          value={formData.target_role}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="target_companies"
          placeholder="Google, Microsoft, Atlassian"
          value={formData.target_companies}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="timeline_months"
          placeholder="Timeline Months"
          value={formData.timeline_months}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;