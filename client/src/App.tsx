import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from 'components/Layout';

import Dashboard from 'pages/Dashboard';
import Swap from 'pages/Swap';
import Wallet from 'pages/Wallet';
import Alerts from 'pages/Alerts';
import Education from 'pages/Education';
import FAQ from 'pages/FAQ';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Onboarding from 'pages/Onboarding';
import WalletSetup from 'pages/WalletSetup';
import SeedPhrase from 'pages/SeedPhrase';
import ConfirmSeed from 'pages/ConfirmSeed';
import Send from 'pages/Send';
import Receive from 'pages/Receive';
import Settings from 'pages/Settings';
import Premium from 'pages/Premium';
import Leaderboard from 'pages/Leaderboard';
import Events from 'pages/Events';
import Community from 'pages/Community';
import TokenDetail from 'pages/TokenDetail';
import Profile from 'pages/Profile';
import Whales from 'pages/Whales';
import Security from 'pages/Security';
import SmartOrders from 'pages/SmartOrders';
import CopyTrading from 'pages/CopyTrading';
import Sniping from 'pages/Sniping';
import History from 'pages/History';
import NotFound from 'pages/NotFound';


import Layout from 'components/Layout';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Onboarding from 'pages/Onboarding';
import WalletSetup from 'pages/WalletSetup';
import SeedPhrase from 'pages/SeedPhrase';
import ConfirmSeed from 'pages/ConfirmSeed';
import Send from 'pages/Send';
import Receive from 'pages/Receive';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/education" element={<Education />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/wallet-setup" element={<WalletSetup />} />
          <Route path="/seed-phrase" element={<SeedPhrase />} />
          <Route path="/confirm-seed" element={<ConfirmSeed />} />
          <Route path="/send" element={<Send />} />
          <Route path="/receive" element={<Receive />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/community" element={<Community />} />
          <Route path="/token/:symbol" element={<TokenDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/whales" element={<Whales />} />
          <Route path="/security" element={<Security />} />
          <Route path="/orders" element={<SmartOrders />} />
          <Route path="/copy-trading" element={<CopyTrading />} />
          <Route path="/sniping" element={<Sniping />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <nav>
        <Link to="/">Dashboard</Link> |{' '}
        <Link to="/wallet">Wallet</Link> |{' '}
        <Link to="/swap">Swap</Link> |{' '}
        <Link to="/alerts">Alerts</Link> |{' '}
        <Link to="/education">Educación</Link> |{' '}
        <Link to="/faq">FAQ</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/register">Register</Link> |{' '}
        <Link to="/onboarding">Onboarding</Link> |{' '}
        <Link to="/wallet-setup">WalletSetup</Link> |{' '}
        <Link to="/seed-phrase">SeedPhrase</Link> |{' '}
        <Link to="/confirm-seed">ConfirmSeed</Link> |{' '}
        <Link to="/send">Send</Link> |{' '}
        <Link to="/receive">Receive</Link>
        <Link to="/settings">Settings</Link>

        <Link to="/premium">Premium</Link>
        <Link to="/leaderboard">Leaderboard</Link> |{' '}
        <Link to="/events">Events</Link>
        <Link to="/community">Community</Link>
        <Link to="/profile">Perfil</Link>

        <Link to="/whales">Whales</Link>
        <Link to="/security">Security</Link>
        <Link to="/orders">Orders</Link> |{' '}
        <Link to="/copy-trading">Copy Trading</Link>
        <Link to="/sniping">Sniping</Link>

        <Link to="/history">Historial</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/education" element={<Education />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/wallet-setup" element={<WalletSetup />} />
        <Route path="/seed-phrase" element={<SeedPhrase />} />
        <Route path="/confirm-seed" element={<ConfirmSeed />} />
        <Route path="/send" element={<Send />} />
        <Route path="/receive" element={<Receive />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/community" element={<Community />} />
        <Route path="/token/:address" element={<TokenDetail />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/whales" element={<Whales />} />

        <Route path="/security" element={<Security />} />

        <Route path="/orders" element={<SmartOrders />} />

        <Route path="/copy-trading" element={<CopyTrading />} />

        <Route path="/sniping" element={<Sniping />} />

        <Route path="/history" element={<History />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
      </Router>
    </QueryClientProvider>
  );
}
