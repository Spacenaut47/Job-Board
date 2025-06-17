import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeToggle from './ThemeToggle';
import { vi } from 'vitest';

// Mock useTheme
vi.mock('../Context/ThemeContext', () => ({
  useTheme: vi.fn(),
}));

import { useTheme } from '../Context/ThemeContext';

describe('ThemeToggle Component', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('renders Moon icon when theme is light', () => {
    const toggleTheme = vi.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme,
    });

    render(<ThemeToggle />);

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.getByText(/switch to dark mode/i)).toBeInTheDocument();
  });

  test('renders Sun icon when theme is dark', () => {
    const toggleTheme = vi.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme,
    });

    render(<ThemeToggle />);

    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.getByText(/switch to light mode/i)).toBeInTheDocument();
  });

  test('calls toggleTheme when clicked', () => {
    const toggleTheme = vi.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme,
    });

    render(<ThemeToggle />);
    fireEvent.click(screen.getByTestId('moon-icon'));

    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});