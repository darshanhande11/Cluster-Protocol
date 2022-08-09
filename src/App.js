import './fonts.css'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
