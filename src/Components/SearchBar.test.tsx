import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
import { vi } from 'vitest';

describe('SearchBar Component', () => {
  test('renders the input field with correct placeholder', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/search by title, company, tech, type/i);
    expect(input).toBeInTheDocument();
  });

  test('calls onSearch with correct input when typing', () => {
    const mockOnSearch = vi.fn(); // ✅ mock function
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/search by title, company, tech, type/i);

    fireEvent.change(input, { target: { value: 'React Developer' } });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('React Developer');
  });

  test('calls onSearch multiple times for multiple keystrokes', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/search by title, company, tech, type/i);

    fireEvent.change(input, { target: { value: 'R' } });
    fireEvent.change(input, { target: { value: 'Re' } });
    fireEvent.change(input, { target: { value: 'Rea' } });

    expect(mockOnSearch).toHaveBeenCalledTimes(3);
    expect(mockOnSearch).toHaveBeenCalledWith('Rea');
  });
});