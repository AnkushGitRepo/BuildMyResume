import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const ProtectedRoute = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    // You can render a loading spinner here while checking auth status
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
