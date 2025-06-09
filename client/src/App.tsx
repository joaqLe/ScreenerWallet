import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from 'pages/Dashboard';
import Swap from 'pages/Swap';
import Wallet from 'pages/Wallet';
import Alerts from 'pages/Alerts';
import Education from 'pages/Education';
import FAQ from 'pages/FAQ';

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
import Layout from 'components/Layout';


import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="swap" element={<Swap />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="education" element={<Education />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="settings" element={<Settings />} />
          <Route path="premium" element={<Premium />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="events" element={<Events />} />
          <Route path="community" element={<Community />} />
          <Route path="token/:symbol" element={<TokenDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="whales" element={<Whales />} />
          <Route path="security" element={<Security />} />
          <Route path="orders" element={<SmartOrders />} />
          <Route path="copy-trading" element={<CopyTrading />} />
          <Route path="sniping" element={<Sniping />} />
          <Route path="history" element={<History />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

