import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Swap from './pages/Swap';
import Wallet from './pages/Wallet';
import Alerts from './pages/Alerts';
import CopyTrading from './pages/CopyTrading';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Dashboard</Link> |{' '}
        <Link to="/wallet">Wallet</Link> |{' '}
        <Link to="/swap">Swap</Link> |{' '}
        <Link to="/alerts">Alerts</Link> |{' '}
        <Link to="/copy-trading">Copy Trading</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/copy-trading" element={<CopyTrading />} />
      </Routes>
    </Router>
  );
}

export default App;
