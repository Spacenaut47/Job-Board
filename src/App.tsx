import './index.css';
import { ThemeProvider } from './Context/ThemeContext';
import Home from './Pages/Home';

function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App;
