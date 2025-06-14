import { Navigate, Outlet } from 'react-router-dom';
import { useWalletContext } from '../context/WalletContext';

export default function PrivateRoute() {
  const { publicKey } = useWalletContext();
  return publicKey ? <Outlet /> : <Navigate to="/login" replace />;
}
