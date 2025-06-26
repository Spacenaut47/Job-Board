import './JobCard.css';
import { FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import type { Job } from '../Hook/useJob';
import { useState } from 'react';
import API from '../api/axios';

const JobCard = ({ job }: { job: Job }) => {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const handleApply = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to apply');
      return;
    }

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

  const isAdmin = localStorage.getItem('isAdmin') === 'true';

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

      {!isAdmin && localStorage.getItem('token') && (
        <>
          <button onClick={() => setShowForm(!showForm)} className="auth-btn">
            {showForm ? 'Cancel' : 'Apply'}
          </button>

          {showForm && (
            <div style={{ marginTop: '1rem' }}>
              <textarea
                placeholder="Your message to the recruiter"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                style={{ width: '100%', marginBottom: '0.5rem' }}
              />
              <button onClick={handleApply} className="auth-btn">Submit</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobCard;
