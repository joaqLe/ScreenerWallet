import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bottom-nav">
      <Link to="/" className={isActive('/') ? 'active' : ''}>🏠</Link>
      <Link to="/swap" className={isActive('/swap') ? 'active' : ''}>🔄</Link>
      <Link to="/copy-trading" className={isActive('/copy-trading') ? 'active' : ''}>👥</Link>
      <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>👤</Link>
    </nav>
  );
}
