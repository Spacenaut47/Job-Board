import './JobCard.css';
import { FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';
import type { Job } from '../Hook/useJob';

const JobCard = ({ job }: { job: Job }) => (
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
  </div>
);

export default JobCard;
