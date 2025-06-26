import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

const EditJobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  const [formData, setFormData] = useState({
    title: "",
    company_name: "",
    employment_type: "",
    languages: "",
    posted: "",
    location: "",
    experience: "",
    rating: ""
  });

  useEffect(() => {
    if (!token || isAdmin !== "true") {
      navigate("/unauthorized");
      return;
    }

    API.get(`/jobs`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        const job = res.data.find(j => j.id === parseInt(id!));
        if (!job) return navigate("/admin");

        setFormData({
          title: job.title,
          company_name: job.company_name,
          employment_type: job.employment_type,
          languages: job.languages.join(", "),
          posted: job.posted,
          location: job.location,
          experience: job.experience,
          rating: job.rating.toString()
        });
      })
      .catch(err => {
        console.error("Failed to load job", err);
        navigate("/admin");
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedJob = {
      ...formData,
      rating: parseFloat(formData.rating),
      languages: formData.languages.split(",").map((lang) => lang.trim())
    };

    try {
      await API.put(`/jobs/${id}`, updatedJob, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Job updated!");
      navigate("/admin");
    } catch (err) {
      console.error("Failed to update job", err);
      alert("Error updating job.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Edit Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} required />
        <input name="company_name" value={formData.company_name} onChange={handleChange} required />
        <input name="employment_type" value={formData.employment_type} onChange={handleChange} required />
        <input name="languages" value={formData.languages} onChange={handleChange} required />
        <input name="posted" value={formData.posted} onChange={handleChange} required />
        <input name="location" value={formData.location} onChange={handleChange} required />
        <input name="experience" value={formData.experience} onChange={handleChange} required />
        <input name="rating" value={formData.rating} type="number" step="0.1" onChange={handleChange} required />
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
};

export default EditJobForm;
