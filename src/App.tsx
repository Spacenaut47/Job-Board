import './index.css';
import { ThemeProvider } from './Context/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home';
import AdminDashboard from "./Pages/AdminDashboard";
import AddJobForm from "./Pages/AddJobForm";
import EditJobForm from "./Pages/EditJobForm";
import JobApplicantsPage from "./Pages/JobApplicantsPage";

function App() {
  return (
    <ThemeProvider>
     <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/unauthorized" element={<p>Unauthorized</p>} />
          <Route path="/admin/add-job" element={<AddJobForm />} />
          <Route path="/admin/edit-job/:id" element={<EditJobForm />} />
          <Route path="/admin/job/:jobId/applicants" element={<JobApplicantsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
