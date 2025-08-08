import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type React from 'react';

const PrivateRoute = ({ children, role }: { children: React.ReactNode; role?: string }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
