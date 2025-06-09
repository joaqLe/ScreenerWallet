import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Swap from './pages/Swap';
import Wallet from './pages/Wallet';
import Alerts from './pages/Alerts';

import History from './pages/History';

import Profile from './pages/Profile';
import TokenDetail from './pages/TokenDetail';
import History from './pages/History';
import BottomNav from './components/BottomNav';

import './App.css';

function App() {
  return (
    <Router>

      <nav>
        <Link to="/">Dashboard</Link> |{' '}
        <Link to="/wallet">Wallet</Link> |{' '}
        <Link to="/swap">Swap</Link> |{' '}
        <Link to="/alerts">Alerts</Link> |{' '}
        <Link to="/history">Historial</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/alerts" element={<Alerts />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/token/:symbol" element={<TokenDetail />} />

        <Route path="/history" element={<History />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
