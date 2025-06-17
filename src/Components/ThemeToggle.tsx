import { useTheme } from '../Context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div className="theme-toggle-container" onClick={toggleTheme}>
      {isLight ? <FaMoon size={24} data-testid="moon-icon"/> : <FaSun size={24} color="#ffe066" data-testid="sun-icon"/>}
      <span className="tooltip">
        Switch to {isLight ? 'dark' : 'light'} mode
      </span>
    </div>
  );
}
export default ThemeToggle
