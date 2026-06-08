import { useEffect, useState } from "react";
import API from "../api/authApi";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/auth/profile/");

        console.log("PROFILE DATA:", response.data);

        setUser(response.data);
      } catch (error) {
        console.error("PROFILE ERROR:", error.response?.data);

        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome, {user.username} 👋</h1>

      <hr />

      <h2>Profile Information</h2>

      <p>
        <strong>Email:</strong>{" "}
        {user.email || "Not Available"}
      </p>

      <p>
        <strong>Target Role:</strong>{" "}
        {user.target_role || "Not Set"}
      </p>

      <p>
        <strong>Timeline:</strong>{" "}
        {user.timeline_months
          ? `${user.timeline_months} months`
          : "Not Set"}
      </p>

      <h3>Target Companies</h3>

      {user.target_companies &&
      user.target_companies.length > 0 ? (
        <ul>
          {user.target_companies.map((company) => (
            <li key={company}>{company}</li>
          ))}
        </ul>
      ) : (
        <p>No target companies selected.</p>
      )}
    </div>
  );
}

export default Dashboard;