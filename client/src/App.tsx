import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Swap from './pages/Swap';
import Wallet from './pages/Wallet';
import Alerts from './pages/Alerts';
import Register from './pages/Register';
import WalletSetup from './pages/WalletSetup';
import SeedPhrase from './pages/SeedPhrase';
import ConfirmSeed from './pages/ConfirmSeed';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Dashboard</Link> |{' '}
        <Link to="/wallet">Wallet</Link> |{' '}
        <Link to="/swap">Swap</Link> |{' '}
        <Link to="/alerts">Alerts</Link> |{' '}
        <Link to="/register">Registro</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wallet-setup" element={<WalletSetup />} />
        <Route path="/seed-phrase" element={<SeedPhrase />} />
        <Route path="/confirm-seed" element={<ConfirmSeed />} />
      </Routes>
    </Router>
  );
}

export default App;
