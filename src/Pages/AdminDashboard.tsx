import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");

    if (!token || isAdmin !== "true") {
      navigate("/unauthorized");
      return;
    }

    // Fetch jobs
    API.get("/jobs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch jobs:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");

    try {
      await API.delete(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(jobs.filter((job) => job.id !== id));
      alert("Job deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete job.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>

      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "1rem",
          marginRight: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#6c757d",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Home
      </button>

      <button
        onClick={() => navigate("/admin/add-job")}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        + Add New Job
      </button>

      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div>
          {jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            <ul>
              {jobs.map((job) => (
                <li key={job.id} style={{ marginBottom: "1rem" }}>
                  <strong>{job.title}</strong> — {job.company_name}

                  <button
                    onClick={() => handleDelete(job.id)}
                    style={{
                      marginLeft: "1rem",
                      padding: "0.4rem 0.8rem",
                      backgroundColor: "crimson",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => navigate(`/admin/edit-job/${job.id}`)}
                    style={{
                      marginLeft: "1rem",
                      padding: "0.4rem 0.8rem",
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
