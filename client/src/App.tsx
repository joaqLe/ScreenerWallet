import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Swap from './pages/Swap';
import Wallet from './pages/Wallet';
import Alerts from './pages/Alerts';
import SmartOrders from './pages/SmartOrders';

import CopyTrading from './pages/CopyTrading';
import Sniping from './pages/Sniping';


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
        <Link to="/orders">Orders</Link> |{' '}
        <Link to="/alerts">Alerts</Link>
        <Link to="/alerts">Alerts</Link> |{' '}
        <Link to="/copy-trading">Copy Trading</Link>
        <Link to="/sniping">Sniping</Link>

        <Link to="/history">Historial</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/orders" element={<SmartOrders />} />

        <Route path="/copy-trading" element={<CopyTrading />} />

        <Route path="/sniping" element={<Sniping />} />


        <Route path="/profile" element={<Profile />} />
        <Route path="/token/:symbol" element={<TokenDetail />} />

        <Route path="/history" element={<History />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
