import { Link, Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Dashboard</Link> |{' '}
        <Link to="/wallet">Wallet</Link> |{' '}
        <Link to="/swap">Swap</Link> |{' '}
        <Link to="/alerts">Alerts</Link> |{' '}
        <Link to="/education">Educación</Link> |{' '}
        <Link to="/faq">FAQ</Link>
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
      <Outlet />
      <BottomNav />
    </>
  );
}
