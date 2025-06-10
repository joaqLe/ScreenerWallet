import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import WalletContext from '../WalletContext';

export default function PrivateRoute() {
  const { publicKey } = useContext(WalletContext);
  return publicKey ? <Outlet /> : <Navigate to="/login" replace />;
}
