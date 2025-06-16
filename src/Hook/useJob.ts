import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Job {
  id: number;
  title: string;
  company_name: string;
  employment_type: string;
  languages: string[];
  posted: string;
  location: string;
  experience: string;
  rating: number;
}

export const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filtered, setFiltered] = useState(false); // NEW

  const jobsPerPage = 6;

  useEffect(() => {
    axios.get('./jobs.json')
      .then(res => {
        setJobs(res.data);
        setFilteredJobs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filterJobs = (query: string) => {
    const lower = query.toLowerCase();
    const results = jobs.filter(job =>
      job.title.toLowerCase().includes(lower) ||
      job.company_name.toLowerCase().includes(lower) ||
      job.location.toLowerCase().includes(lower) ||
      job.employment_type.toLowerCase().includes(lower) ||
      job.languages.some(lang => lang.toLowerCase().includes(lower))
    );
    setFilteredJobs(results);
    setPage(1); // Reset to first page after filtering
    setFiltered(!!query); // Track if filtering is active
  };

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

  return {
    jobs: currentJobs,
    allFiltered: filteredJobs, // full filtered results
    filtered,                  // whether filter is active
    loading,
    filterJobs,
    page,
    totalPages,
    nextPage: () => setPage(p => Math.min(p + 1, totalPages)),
    prevPage: () => setPage(p => Math.max(p - 1, 1)),
  };
};
