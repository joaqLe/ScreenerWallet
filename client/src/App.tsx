import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Swap from './pages/Swap';
import Wallet from './pages/Wallet';
import Alerts from './pages/Alerts';
import Onboarding from './pages/Onboarding';
import './App.css';

function Nav() {
  const location = useLocation();
  if (location.pathname === '/') return null;
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link> |{' '}
      <Link to="/wallet">Wallet</Link> |{' '}
      <Link to="/swap">Swap</Link> |{' '}
      <Link to="/alerts">Alerts</Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </Router>
  );
}

export default App;
