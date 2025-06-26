import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './JobCard.css';
import { FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import type { Job } from '../Hook/useJob';

const JobCard = ({ job }: { job: Job }) => {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleApplyClick = () => {
    if (!token) {
      navigate('/login'); 
    } else {
      setShowForm(true); 
    }
  };

  const handleApply = async () => {
    try {
      await API.post(`/jobapplications/${job.id}`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Application submitted!');
      setShowForm(false);
      setMessage('');
    } catch (err) {
      console.error(err);
      alert('Application failed');
    }
  };

  return (
    <div className="job-card">
      <div className="card-header">
        <div>
          <h3>{job.title}</h3>
          <p className="company">{job.company_name}</p>
          <div className="meta">
            <span><FaUserTie /> {job.experience} </span>
            <span><FaMapMarkerAlt /> {job.location}</span>
          </div>
        </div>
        <div className="posted">{job.posted}</div>
      </div>
      <p className="skills">Skills: {job.languages.join(', ')}</p>
      <p className="employment">{job.employment_type}</p>

      {!isAdmin && (
        <>
          <button onClick={handleApplyClick} className="auth-btn">
            Apply
          </button>

          {showForm && token && (
            <div style={{ marginTop: '1rem' }}>
              <textarea
                placeholder="Your message to the recruiter"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                style={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <button onClick={handleApply} className="auth-btn">Submit</button>
              <button onClick={() => setShowForm(false)} className="auth-btn">Cancel</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobCard;
