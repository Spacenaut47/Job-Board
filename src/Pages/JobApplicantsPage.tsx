import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

const JobApplicantsPage = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");

    if (!token || isAdmin !== "true") {
      navigate("/unauthorized");
      return;
    }

    API.get(`/jobapplications/job/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setApplicants(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load applicants");
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Applicants for Job ID: {jobId}</h2>
      {applicants.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <ul>
          {applicants.map((a) => (
            <li key={a.id} style={{ marginBottom: "1rem" }}>
              <strong>{a.user.name}</strong> — {a.user.email}
              <p><i>{a.message}</i></p>
              <p>Applied on: {new Date(a.appliedOn).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobApplicantsPage;
