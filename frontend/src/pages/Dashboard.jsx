import { useEffect, useState } from "react";
import API from "../api/authApi";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [resume, setResume] = useState(null);
  const [intelligence, setIntelligence] =
    useState(null);

  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #0f172a, #111827, #1e293b)",
      color: "#f8fafc",
      padding: "40px",
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    },

    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },

    heroCard: {
      background:
        "rgba(255,255,255,0.05)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter:
        "blur(20px)",
      border:
        "1px solid rgba(255,255,255,0.08)",
      borderRadius: "24px",
      padding: "30px",
      marginBottom: "25px",
      boxShadow:
        "0 20px 40px rgba(0,0,0,0.3)",
    },

    section: {
      background:
        "rgba(255,255,255,0.04)",
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter:
        "blur(15px)",
      border:
        "1px solid rgba(255,255,255,0.08)",
      borderRadius: "20px",
      padding: "25px",
      marginBottom: "20px",
      boxShadow:
        "0 10px 25px rgba(0,0,0,0.2)",
    },

    heading: {
      color: "#60a5fa",
      marginBottom: "20px",
      fontSize: "1.4rem",
      fontWeight: "700",
    },

    grid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "20px",
      marginBottom: "20px",
    },

    statCard: {
      background: "#1e293b",
      border:
        "1px solid #334155",
      borderRadius: "14px",
      padding: "15px",
      marginBottom: "12px",
    },

    input: {
      background: "#0f172a",
      color: "#fff",
      border:
        "1px solid #334155",
      padding: "12px",
      borderRadius: "12px",
    },

    button: {
      background:
        "linear-gradient(135deg,#3b82f6,#8b5cf6)",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: "600",
      marginLeft: "10px",
    },

    skillChip: {
      display: "inline-block",
      background:
        "linear-gradient(135deg,#2563eb,#7c3aed)",
      color: "white",
      padding: "8px 14px",
      borderRadius: "999px",
      margin: "5px",
      fontSize: "14px",
      fontWeight: "500",
    },

    progressContainer: {
      width: "100%",
      height: "10px",
      background: "#334155",
      borderRadius: "10px",
      marginTop: "8px",
      overflow: "hidden",
    },

    profileItem: {
      marginBottom: "12px",
      fontSize: "15px",
      color: "#cbd5e1",
    },
  };

  const fetchIntelligence = async () => {
    try {
      const response =
        await API.get(
          "/profile/intelligence/"
        );

      setIntelligence(
        response.data
      );
    } catch (error) {
      console.error(
        "INTELLIGENCE ERROR:",
        error.response?.data
      );
    }
  };

  const uploadResume = async () => {
    if (!resume) {
      alert(
        "Please select a resume."
      );
      return;
    }

    const formData =
      new FormData();

    formData.append(
      "resume_file",
      resume
    );

    try {
      await API.post(
        "/profile/upload-resume/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(
        "Resume uploaded successfully."
      );

      fetchIntelligence();
    } catch (error) {
      console.error(
        "UPLOAD ERROR:",
        error.response?.data
      );

      alert(
        "Resume upload failed."
      );
    }
  };

  useEffect(() => {
    const fetchProfile =
      async () => {
        try {
          const response =
            await API.get(
              "/auth/profile/"
            );

          setUser(
            response.data
          );
        } catch (error) {
          console.error(
            "PROFILE ERROR:",
            error.response?.data
          );

          setError(
            "Failed to load profile."
          );
        }
      };

    fetchProfile();
    fetchIntelligence();
  }, []);

  if (error) {
    return (
      <div
        style={styles.page}
      >
        <h2>{error}</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={styles.page}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div
        style={
          styles.container
        }
      >
        <div
          style={
            styles.heroCard
          }
        >
          <h1>
            Welcome,{" "}
            {
              user.username
            }{" "}
            👋
          </h1>

          <p
            style={{
              color:
                "#94a3b8",
            }}
          >
            AI Career
            Intelligence
            Dashboard
          </p>
        </div>

        <div
          style={
            styles.grid
          }
        >
          <div
            style={
              styles.section
            }
          >
            <h2
              style={
                styles.heading
              }
            >
              Profile
              Information
            </h2>

            <p
              style={
                styles.profileItem
              }
            >
              <strong>
                Email:
              </strong>{" "}
              {user.email ||
                "Not Available"}
            </p>

            <p
              style={
                styles.profileItem
              }
            >
              <strong>
                Target
                Role:
              </strong>{" "}
              {user.target_role ||
                "Not Set"}
            </p>

            <p
              style={
                styles.profileItem
              }
            >
              <strong>
                Timeline:
              </strong>{" "}
              {user.timeline_months
                ? `${user.timeline_months} months`
                : "Not Set"}
            </p>
          </div>

          <div
            style={
              styles.section
            }
          >
            <h2
              style={
                styles.heading
              }
            >
              Target
              Companies
            </h2>

            {user.target_companies &&
            user
              .target_companies
              .length >
              0 ? (
              user.target_companies.map(
                (
                  company
                ) => (
                  <div
                    key={
                      company
                    }
                    style={
                      styles.statCard
                    }
                  >
                    {
                      company
                    }
                  </div>
                )
              )
            ) : (
              <p>
                No target
                companies
                selected.
              </p>
            )}
          </div>
        </div>

        <div
          style={
            styles.section
          }
        >
          <h2
            style={
              styles.heading
            }
          >
            Resume Upload
          </h2>

          <input
            type="file"
            style={
              styles.input
            }
            onChange={(
              e
            ) =>
              setResume(
                e.target
                  .files[0]
              )
            }
          />

          <button
            onClick={
              uploadResume
            }
            style={
              styles.button
            }
          >
            Upload
            Resume
          </button>
        </div>

        <div
          style={
            styles.section
          }
        >
          <h2
            style={
              styles.heading
            }
          >
            Detected Skills
          </h2>

          {intelligence
            ?.skills
            ?.length ? (
            intelligence.skills.map(
              (
                skill
              ) => (
                <span
                  key={
                    skill.skill
                  }
                  style={
                    styles.skillChip
                  }
                >
                  {
                    skill.skill
                  }
                </span>
              )
            )
          ) : (
            <p>
              No skills
              detected
              yet.
            </p>
          )}
        </div>

        <div
          style={
            styles.grid
          }
        >
          <div
            style={
              styles.section
            }
          >
            <h2
              style={
                styles.heading
              }
            >
              Skill
              Confidence
            </h2>

            {intelligence
              ?.skills
              ?.length ? (
              intelligence.skills.map(
                (
                  skill
                ) => (
                  <div
                    key={`${skill.skill}-confidence`}
                    style={
                      styles.statCard
                    }
                  >
                    <strong>
                      {
                        skill.skill
                      }
                    </strong>

                    <div
                      style={
                        styles.progressContainer
                      }
                    >
                      <div
                        style={{
                          width: `${skill.confidence}%`,
                          height:
                            "100%",
                          background:
                            "linear-gradient(90deg,#3b82f6,#8b5cf6)",
                        }}
                      />
                    </div>

                    <p>
                      {
                        skill.confidence
                      }
                      %
                    </p>
                  </div>
                )
              )
            ) : (
              <p>
                No
                confidence
                data
                available.
              </p>
            )}
          </div>

          <div
            style={
              styles.section
            }
          >
            <h2
              style={
                styles.heading
              }
            >
              Category
              Scores
            </h2>

            {intelligence
              ?.categories
              ?.length ? (
              intelligence.categories.map(
                (
                  category
                ) => (
                  <div
                    key={
                      category.category
                    }
                    style={
                      styles.statCard
                    }
                  >
                    <strong>
                      {
                        category.category
                      }
                    </strong>

                    <div
                      style={
                        styles.progressContainer
                      }
                    >
                      <div
                        style={{
                          width: `${category.score}%`,
                          height:
                            "100%",
                          background:
                            "linear-gradient(90deg,#22c55e,#06b6d4)",
                        }}
                      />
                    </div>

                    <p>
                      {
                        category.score
                      }
                      %
                    </p>
                  </div>
                )
              )
            ) : (
              <p>
                No
                category
                scores
                available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;