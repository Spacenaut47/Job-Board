import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobCard from './JobCard';
import type { Job } from '../Hook/useJob';

const mockJob:Job = {
  id:1,
  title: 'Frontend Developer',
  company_name: 'Tech Corp',
  experience: '2-4 years',
  location: 'Bangalore',
  posted: '2 days ago',
  languages: ['JavaScript', 'React', 'CSS'],
  employment_type: 'Full-time',
  rating:4.9
};

describe('JobCard Component', () => {
  beforeEach(() => {
    render(<JobCard job={mockJob} />);
  });

  test('renders job title', () => {
    expect(screen.getByRole('heading', { name: /frontend developer/i })).toBeInTheDocument();
  });

  test('renders company name', () => {
    expect(screen.getByText(/tech corp/i)).toBeInTheDocument();
  });

  test('renders experience', () => {
    expect(screen.getByText(/2-4 years/i)).toBeInTheDocument();
  });

  test('renders location', () => {
    expect(screen.getByText(/bangalore/i)).toBeInTheDocument();
  });

  test('renders posted date', () => {
    expect(screen.getByText(/2 days ago/i)).toBeInTheDocument();
  });

  test('renders skills list', () => {
    expect(screen.getByText(/skills: javascript, react, css/i)).toBeInTheDocument();
  });

  test('renders employment type', () => {
    expect(screen.getByText(/full-time/i)).toBeInTheDocument();
  });
});