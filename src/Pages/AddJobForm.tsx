import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const AddJobForm = () => {
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
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jobData = {
        ...formData,
        rating: parseFloat(formData.rating),
        languages: formData.languages.split(",").map((lang) => lang.trim())
      };

      await API.post("/jobs", jobData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Job posted successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Error adding job:", err);
      alert("Failed to add job.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add New Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="company_name" placeholder="Company Name" onChange={handleChange} required />
        <input name="employment_type" placeholder="Employment Type" onChange={handleChange} required />
        <input name="languages" placeholder="Languages (comma-separated)" onChange={handleChange} required />
        <input name="posted" placeholder="Posted Date (YYYY-MM-DD)" onChange={handleChange} required />
        <input name="location" placeholder="Location" onChange={handleChange} required />
        <input name="experience" placeholder="Experience" onChange={handleChange} required />
        <input name="rating" type="number" step="0.1" placeholder="Rating" onChange={handleChange} required />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default AddJobForm;
