import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <Link to="/" className={isActive('/') ? 'active' : ''}>🏠</Link>
      <Link to="/card" className={isActive('/card') ? 'active' : ''}>💳</Link>
      <Link to="/wallet" className={isActive('/wallet') ? 'active' : ''}>👛</Link>
      <Link to="/savings" className={isActive('/savings') ? 'active' : ''}>💰</Link>
    </nav>
  );
}
