import JobCard from '../Components/JobCard';
import SearchBar from '../Components/SearchBar';
import ThemeToggle from '../Components/ThemeToggle';
import TopCompanies from '../Components/TopCompanies';
import { useJobs } from '../Hook/useJob';
import './Home.css';
import logo from './logo.png'

const Home = () => {
  const {
    jobs,
    allFiltered,
    filtered,
    loading,
    filterJobs,
    nextPage,
    prevPage,
    page,
    totalPages
  } = useJobs();

  if (loading) return <p>Loading jobs...</p>;

  return (
    <>
      <div className="top-bar">
        <div className="nav-left">
          <img src={logo} alt="JobFinder Logo" className="logo-img" />
        </div>
        <div className="nav-center">
          <SearchBar onSearch={filterJobs} />
        </div>
        <div className="nav-right">
          <ThemeToggle />
        </div>
      </div>

      <div className="content">
        {filtered && (
          <div className="search-section">
            <h2>Search Result</h2>
            {allFiltered.length === 0
              ? <p>No matched found</p>
              : <div className="home">{jobs.map(job => <JobCard key={job.id} job={job} />)}</div>}
          </div>
        )}
        <TopCompanies />
        <h2 className="section-title">Featured Jobs</h2>
        <div className="home">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="pagination">
          <button disabled={page === 1} onClick={prevPage}>Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={nextPage}>Next</button>
        </div>
      </div>
    </>
  );
};

export default Home;
