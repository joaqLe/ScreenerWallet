-principal
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

import Profile from './pages/Profile';
import TokenDetail from './pages/TokenDetail';
import BottomNav from './components/BottomNav';


import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';

import Register from './pages/Register';
import WalletSetup from './pages/WalletSetup';
import SeedPhrase from './pages/SeedPhrase';
import ConfirmSeed from './pages/ConfirmSeed';

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


      <nav>
        <Link to="/">Dashboard</Link> |{' '}
        <Link to="/wallet">Wallet</Link> |{' '}
        <Link to="/swap">Swap</Link> |{' '}
        <Link to="/alerts">Alerts</Link> |{' '}
        <Link to="/register">Registro</Link>
      </nav>
      <Nav />

      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/token/:symbol" element={<TokenDetail />} />

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/register" element={<Register />} />
        <Route path="/wallet-setup" element={<WalletSetup />} />
        <Route path="/seed-phrase" element={<SeedPhrase />} />
        <Route path="/confirm-seed" element={<ConfirmSeed />} />

      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
