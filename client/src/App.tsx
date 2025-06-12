import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Swap from './pages/Swap';
import Wallet from './pages/Wallet';
import Alerts from './pages/Alerts';
import Education from './pages/Education';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import WalletSetup from './pages/WalletSetup';
import SeedPhrase from './pages/SeedPhrase';
import ConfirmSeed from './pages/ConfirmSeed';
import Send from './pages/Send';
import Receive from './pages/Receive';
import Settings from './pages/Settings';
import Premium from './pages/Premium';
import Leaderboard from './pages/Leaderboard';
import Events from './pages/Events';
import Community from './pages/Community';
import TokenDetail from './pages/TokenDetail';
import Profile from './pages/Profile';
import Whales from './pages/Whales';
import Security from './pages/Security';
import SmartOrders from './pages/SmartOrders';
import CopyTrading from './pages/CopyTrading';
import Sniping from './pages/Sniping';
import History from './pages/History';
import Card from './pages/Card';
import Savings from './pages/Savings';
import NotFound from './pages/NotFound';
import BottomNav from './components/BottomNav';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    const ws = new WebSocket(import.meta.env.VITE_WS_URL || 'ws://localhost:3001');
    ws.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'alert') {
          navigator.serviceWorker.ready.then(reg =>
            reg.active?.postMessage({
              title: 'Nueva alerta',
              options: { body: `${data.alert.token} ${data.alert.type}` },
            })
          );
        }
      } catch (err) {
        console.error(err);
      }
    });
    return () => ws.close();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/card" element={<Card />} />
            <Route path="/savings" element={<Savings />} />
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
          </Route>
        </Routes>
        <BottomNav />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
